const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const projectsRoutes = require("./routes/projects");

const app = express();
const PORT = process.env.PORT || 3000;

const ROOT_DIR = __dirname;
const INDEX_FILE = path.join(ROOT_DIR, "index.html");

/* ================= MIDDLEWARE ================= */

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

/* ================= API ================= */

app.use("/api/projects", projectsRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Strategy Platform API ishlayapti"
  });
});

// ...existing code...

/* ================= FRONTEND STATIC ================= */

app.use("/strategy-app/partials", express.static(path.join(ROOT_DIR, "layout")));

app.get("/strategy-app/sections/:section.html", (req, res, next) => {
  const sectionFile = path.join(ROOT_DIR, "modules", req.params.section, `${req.params.section}.html`);

  if (fs.existsSync(sectionFile)) {
    return res.sendFile(sectionFile);
  }

  next();
});

app.use("/strategy-app", express.static(ROOT_DIR));

// ...existing code...

/* ================= FRONTEND STATIC ================= */

/*
  Bu bitta qator hamma frontend fayllarni beradi:
  css, js, layout, modules, index.html
*/
app.use("/strategy-app", express.static(ROOT_DIR));

/* ================= INDEX ================= */

app.get("/", (req, res) => {
  res.redirect("/strategy-app/index.html");
});

app.get("/strategy-app", (req, res) => {
  res.redirect("/strategy-app/index.html");
});

app.get("/strategy-app/index.html", (req, res) => {
  res.sendFile(INDEX_FILE);
});

/* ================= TEST ================= */

app.get("/test/files", (req, res) => {
  res.json({
    root: ROOT_DIR,

    index: fs.existsSync(path.join(ROOT_DIR, "index.html")),

    cssMain: fs.existsSync(path.join(ROOT_DIR, "css", "main.css")),
    cssBase: fs.existsSync(path.join(ROOT_DIR, "css", "base.css")),
    cssLayout: fs.existsSync(path.join(ROOT_DIR, "css", "layout.css")),
    cssResponsive: fs.existsSync(path.join(ROOT_DIR, "css", "responsive.css")),

    sidebarHtml: fs.existsSync(path.join(ROOT_DIR, "layout", "sidebar.html")),
    sidebarCss: fs.existsSync(path.join(ROOT_DIR, "layout", "sidebar.css")),
    headerHtml: fs.existsSync(path.join(ROOT_DIR, "layout", "header.html")),
    headerCss: fs.existsSync(path.join(ROOT_DIR, "layout", "header.css")),

    dashboardHtml: fs.existsSync(path.join(ROOT_DIR, "modules", "dashboard", "dashboard.html")),
    dashboardCss: fs.existsSync(path.join(ROOT_DIR, "modules", "dashboard", "dashboard.css")),
    dashboardJs: fs.existsSync(path.join(ROOT_DIR, "modules", "dashboard", "dashboard.js")),

    projectsHtml: fs.existsSync(path.join(ROOT_DIR, "modules", "projects", "projects.html")),
    projectsCss: fs.existsSync(path.join(ROOT_DIR, "modules", "projects", "projects.css")),
    projectsJs: fs.existsSync(path.join(ROOT_DIR, "modules", "projects", "projects.js")),
    projectModalHtml: fs.existsSync(path.join(ROOT_DIR, "modules", "projects", "project-modal.html")),
    projectModalCss: fs.existsSync(path.join(ROOT_DIR, "modules", "projects", "project-modal.css")),

    structureHtml: fs.existsSync(path.join(ROOT_DIR, "modules", "structure", "structure.html")),
    structureCss: fs.existsSync(path.join(ROOT_DIR, "modules", "structure", "structure.css")),
    structureJs: fs.existsSync(path.join(ROOT_DIR, "modules", "structure", "structure.js")),

    tadatHtml: fs.existsSync(path.join(ROOT_DIR, "modules", "tadat", "tadat.html")),
    tadatCss: fs.existsSync(path.join(ROOT_DIR, "modules", "tadat", "tadat.css")),
    tadatJs: fs.existsSync(path.join(ROOT_DIR, "modules", "tadat", "tadat.js")),

    reportsHtml: fs.existsSync(path.join(ROOT_DIR, "modules", "reports", "reports.html")),
    reportsCss: fs.existsSync(path.join(ROOT_DIR, "modules", "reports", "reports.css")),
    reportsJs: fs.existsSync(path.join(ROOT_DIR, "modules", "reports", "reports.js")),

    settingsHtml: fs.existsSync(path.join(ROOT_DIR, "modules", "settings", "settings.html")),
    settingsCss: fs.existsSync(path.join(ROOT_DIR, "modules", "settings", "settings.css")),
    settingsJs: fs.existsSync(path.join(ROOT_DIR, "modules", "settings", "settings.js"))
  });
});

/* ================= 404 ================= */

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    path: req.originalUrl
  });
});

/* ================= START ================= */

app.listen(PORT, () => {
  console.log("=================================");
  console.log(`Server running: http://localhost:${PORT}`);
  console.log(`Frontend: http://localhost:${PORT}/strategy-app/index.html`);
  console.log(`API: http://localhost:${PORT}/api/projects`);
  console.log(`Test files: http://localhost:${PORT}/test/files`);
  console.log("ROOT_DIR:", ROOT_DIR);
  console.log("=================================");
});