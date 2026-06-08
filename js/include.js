/* =========================================================
   HTML INCLUDE LOADER
   GitHub Pages + Localhost uchun mos
   Nested include qo‘llab-quvvatlanadi
========================================================= */

/*
  Muhim:
  Bu fayl index.html ichida shunday chaqirilishi kerak:

  <script src="./js/include.js?v=74"></script>

  index.html css ham shunday bo‘lsin:

  <link rel="stylesheet" href="./css/main.css?v=74">
*/

const INCLUDE_VERSION = "74";

/* include.js qayerdan yuklangan bo‘lsa, project rootni avtomatik topadi */
const INCLUDE_SCRIPT_URL = document.currentScript
  ? document.currentScript.src
  : window.location.href;

/*
  Agar include.js:
  https://tulqingethab.github.io/strategiya-platform/js/include.js
  bo‘lsa, APP_BASE_URL:
  https://tulqingethab.github.io/strategiya-platform/
  bo‘ladi.
*/
const APP_BASE_URL = new URL("../", INCLUDE_SCRIPT_URL);

/* =========================================================
   URL HELPER
========================================================= */

function makeIncludeUrl(file) {
  if (!file) return "";

  const fileText = String(file).trim();

  if (
    fileText.startsWith("http://") ||
    fileText.startsWith("https://") ||
    fileText.startsWith("data:")
  ) {
    return fileText;
  }

  /*
    Boshidagi / ni olib tashlaymiz.
    Masalan:
    /layout/header.html -> layout/header.html
  */
  const cleanFile = fileText.replace(/^\/+/, "");

  return new URL(cleanFile, APP_BASE_URL).href;
}

function makeVersionedUrl(file) {
  const url = makeIncludeUrl(file);

  if (!url) return "";

  const separator = url.includes("?") ? "&" : "?";

  return `${url}${separator}v=${INCLUDE_VERSION}`;
}

/* =========================================================
   INCLUDE HTML PARTS
========================================================= */

async function includeHTMLParts() {
  let hasError = false;

  /*
    while kerak:
    Chunki bitta html ichida yana data-include bo‘lishi mumkin.
  */
  while (document.querySelector("[data-include]")) {
    const includeElements = Array.from(
      document.querySelectorAll("[data-include]")
    );

    for (const element of includeElements) {
      const file = element.getAttribute("data-include");
      const url = makeVersionedUrl(file);

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

        console.error("INCLUDE ERROR:", {
          file,
          url,
          error
        });

        element.innerHTML = `
          <div style="
            padding:14px 16px;
            margin:10px 0;
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

        /*
          data-include olib tashlanadi,
          aks holda while cheksiz aylanib qoladi.
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

function loadScript(file) {
  return new Promise((resolve, reject) => {
    const src = makeVersionedUrl(file);

    const exists = Array.from(document.scripts).some(script => {
      return script.src === src;
    });

    if (exists) {
      resolve();
      return;
    }

    const script = document.createElement("script");

    script.src = src;
    script.defer = false;

    script.onload = () => resolve();

    script.onerror = () => {
      reject(new Error(`${file} yuklanmadi: ${src}`));
    };

    document.body.appendChild(script);
  });
}

/* =========================================================
   LOAD APP SCRIPTS
========================================================= */

async function loadAppScripts() {
  /*
    Bu yerda hech qayerda /strategy-app/ yozilmaydi.
    Hammasi APP_BASE_URL orqali avtomatik yuradi.
  */

  /* Core */
  await loadScript("js/core.js");
  await loadScript("js/api.js");

  /* Modules */
  await loadScript("modules/dashboard/dashboard.js");
  await loadScript("modules/projects/projects.js");
  await loadScript("modules/projects/project-workspace.js");
  await loadScript("modules/structure/structure.js");
  await loadScript("modules/tadat/tadat.js");
  await loadScript("modules/reports/reports.js");
  await loadScript("modules/settings/settings.js");

  /* Main app */
  await loadScript("js/app.js");
}

/* =========================================================
   START APP
========================================================= */

async function startApp() {
  try {
    const htmlLoaded = await includeHTMLParts();

    if (!htmlLoaded) {
      console.error("Ba’zi HTML bo‘limlar yuklanmadi. app.js ishga tushirilmadi.");
      return;
    }

    await loadAppScripts();

  } catch (error) {
    console.error("APP START ERROR:", error);

    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div style="
        position:fixed;
        left:20px;
        right:20px;
        bottom:20px;
        z-index:99999;
        padding:16px 18px;
        border-radius:16px;
        background:#fef2f2;
        border:1px solid #fecaca;
        color:#991b1b;
        font-family:Inter, Arial, sans-serif;
        font-weight:800;
        box-shadow:0 20px 40px rgba(15,23,42,.18);
      ">
        Platformani yuklashda xatolik bo‘ldi. Console oynasini tekshiring.
      </div>
      `
    );
  }
}

document.addEventListener("DOMContentLoaded", startApp);