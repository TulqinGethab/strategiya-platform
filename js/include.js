/* =========================================================
   HTML INCLUDE LOADER
   Nested include qo‘llab-quvvatlanadi
========================================================= */

const APP_BASE = "/strategy-app/";

function makeIncludeUrl(file) {
  if (!file) return "";

  if (file.startsWith("http://") || file.startsWith("https://")) {
    return file;
  }

  if (file.startsWith("/")) {
    return file;
  }

  return APP_BASE + file;
}

/* =========================================================
   INCLUDE HTML PARTS
========================================================= */

async function includeHTMLParts() {
  let hasError = false;

  /*
    while kerak:
    Chunki projects.html ichida yana project-modal.html include bo‘lishi mumkin.
  */
  while (document.querySelector("[data-include]")) {
    const includeElements = document.querySelectorAll("[data-include]");

    for (const element of includeElements) {
      const file = element.getAttribute("data-include");
      const url = makeIncludeUrl(file);

      try {
        const response = await fetch(url, {
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error(`${file} yuklanmadi. HTTP ${response.status}`);
        }

        const html = await response.text();

        element.outerHTML = html;

      } catch (error) {
        hasError = true;

        console.error("INCLUDE ERROR:", error);

        element.innerHTML = `
          <div style="
            padding:14px 16px;
            color:#dc2626;
            font-weight:800;
            font-family:Inter, Arial, sans-serif;
          ">
            ${file} yuklanmadi
          </div>
        `;

        /*
          Muhim:
          data-include olib tashlanadi, aks holda while cheksiz aylanadi.
        */
        element.removeAttribute("data-include");
      }
    }
  }

  return !hasError;
}

/* =========================================================
   SCRIPT LOADER
========================================================= */

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src = src;
    script.onload = resolve;

    script.onerror = () => {
      reject(new Error(src + " yuklanmadi"));
    };

    document.body.appendChild(script);
  });
}

/* =========================================================
   LOAD APP SCRIPTS
========================================================= */

async function loadAppScripts() {
  const v = "73";

  /* Core */
  await loadScript(`/strategy-app/js/core.js?v=${v}`);
  await loadScript(`/strategy-app/js/api.js?v=${v}`);

  /* Modules */
  await loadScript(`/strategy-app/modules/dashboard/dashboard.js?v=${v}`);
  await loadScript(`/strategy-app/modules/projects/projects.js?v=${v}`);
  await loadScript(`/strategy-app/modules/projects/project-workspace.js?v=${v}`);
  await loadScript(`/strategy-app/modules/structure/structure.js?v=${v}`);
  await loadScript(`/strategy-app/modules/tadat/tadat.js?v=${v}`);
  await loadScript(`/strategy-app/modules/reports/reports.js?v=${v}`);
  await loadScript(`/strategy-app/modules/settings/settings.js?v=${v}`);

  /* Main app */
  await loadScript(`/strategy-app/js/app.js?v=${v}`);
}

/* =========================================================
   START APP
========================================================= */

async function startApp() {
  const htmlLoaded = await includeHTMLParts();

  if (!htmlLoaded) {
    console.error("Ba’zi HTML bo‘limlar yuklanmadi. app.js ishga tushirilmadi.");
    return;
  }

  await loadAppScripts();
}

startApp();