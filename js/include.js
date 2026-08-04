/* =========================================================
   HTML INCLUDE LOADER
   GitHub Pages + Localhost uchun mos
========================================================= */

const APP_VERSION = "structure-sq-orgchart-20260803";

/* =========================================================
   URL HELPER
========================================================= */

function getBasePath() {
  /*
    GitHub Pages:
    /strategiya-platform/
    
    Localhost:
    /
  */
  const path = window.location.pathname;

  if (path.includes("/strategiya-platform/")) {
    return "/strategiya-platform/";
  }

  return "./";
}

const APP_BASE = getBasePath();

function makeUrl(file) {
  if (!file) return "";

  const cleanFile = String(file).trim().replace(/^\/+/, "");

  if (cleanFile.startsWith("http://") || cleanFile.startsWith("https://")) {
    return cleanFile;
  }

  return `${APP_BASE}${cleanFile}?v=${APP_VERSION}`;
}

/* =========================================================
   INCLUDE HTML PARTS
========================================================= */

async function includeHTMLParts() {
  let hasError = false;

  while (document.querySelector("[data-include]")) {
    const includeElements = Array.from(document.querySelectorAll("[data-include]"));

    for (const element of includeElements) {
      const file = element.getAttribute("data-include");
      const url = makeUrl(file);

      try {
        const response = await fetch(url, {
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error(`${file} yuklanmadi. HTTP ${response.status}. URL: ${url}`);
        }

        const html = await response.text();
        element.outerHTML = html;

      } catch (error) {
        hasError = true;

        console.error("INCLUDE ERROR:", error);

        element.innerHTML = `
          <div style="
            padding:14px 16px;
            margin:10px;
            border:1px solid #fecaca;
            border-radius:12px;
            background:#fef2f2;
            color:#dc2626;
            font-weight:800;
            font-family:Inter, Arial, sans-serif;
          ">
            ${file} yuklanmadi
          </div>
        `;

        element.removeAttribute("data-include");
      }
    }
  }

  return !hasError;
}

/* =========================================================
   SCRIPT LOADER
========================================================= */

function loadScript(file) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src = makeUrl(file);

    script.onload = () => resolve();

    script.onerror = () => {
      reject(new Error(`${file} yuklanmadi`));
    };

    document.body.appendChild(script);
  });
}

/* =========================================================
   LOAD APP SCRIPTS
========================================================= */

async function loadAppScripts() {
  await loadScript("js/core.js");
  await loadScript("js/api.js");

  await loadScript("modules/dashboard/dashboard.js");
  await loadScript("modules/projects/projects.js");
  await loadScript("modules/projects/project-workspace.js");
  await loadScript("modules/structure/structure.js");
  await loadScript("modules/tadat/tadat.js");
  await loadScript("modules/bready/bready.js");
  await loadScript("modules/indexlar/indexlar.js");
  await loadScript("modules/indicators/indicators.js");
  await loadScript("modules/settings/settings.js");

  await loadScript("js/app.js");
}

/* =========================================================
   START APP
========================================================= */

async function startApp() {
  try {
    const htmlLoaded = await includeHTMLParts();

    if (!htmlLoaded) {
      console.error("Ba’zi HTML bo‘limlar yuklanmadi.");
      return;
    }

    await loadAppScripts();

  } catch (error) {
    console.error("APP START ERROR:", error);

    document.body.insertAdjacentHTML("beforeend", `
      <div style="
        position:fixed;
        left:20px;
        right:20px;
        bottom:20px;
        z-index:99999;
        padding:16px;
        border-radius:14px;
        background:#fef2f2;
        border:1px solid #fecaca;
        color:#991b1b;
        font-family:Inter, Arial, sans-serif;
        font-weight:800;
      ">
        Platformani yuklashda xatolik bor. Console oynasini tekshiring.
      </div>
    `);
  }
}

document.addEventListener("DOMContentLoaded", startApp);