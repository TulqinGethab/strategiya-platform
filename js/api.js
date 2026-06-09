/* =========================================================
   API.JS
   Supabase bilan ishlash
========================================================= */

const SUPABASE_URL = "https://besaextxeghbhztcvgyt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Dd7-Z_udkO4FItXwW0tW6Q_QCS1YR8R";

if (typeof supabase === "undefined") {
  console.error("Supabase JS yuklanmagan. index.html ichida supabase scriptni tekshiring.");
}

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

/* =========================================================
   SUPABASE ROW -> APP PROJECT
========================================================= */

function mapSupabaseProject(row = {}) {
  return {
    id: row.id,

    incomingNumber: row.incoming_number || "",
    incomingDate: row.incoming_date || "",

    outgoingNumber: row.outgoing_number || "",
    outgoingDate: row.outgoing_date || "",

    docNumber: row.doc_number || "",
    docName: row.doc_name || "",
    docDate: row.doc_date || "",

    eventName: row.event_name || "",
    name: row.event_name || row.doc_name || "Nomsiz project",

    mechanism: row.mechanism || "",
    implementationForm: row.implementation_form || "",

    author: row.author || "",
    executors: row.executors || "",

    deadline: row.deadline || "",
    status: row.status || "active",

    createdAt: row.created_at || "",
    updatedAt: row.updated_at || "",

    /* Eski kodlar uchun snake_case */
    incoming_number: row.incoming_number || "",
    incoming_date: row.incoming_date || "",
    outgoing_number: row.outgoing_number || "",
    outgoing_date: row.outgoing_date || "",
    doc_number: row.doc_number || "",
    doc_name: row.doc_name || "",
    doc_date: row.doc_date || "",
    event_name: row.event_name || "",
    implementation_form: row.implementation_form || "",
    created_at: row.created_at || "",
    updated_at: row.updated_at || ""
  };
}

/* =========================================================
   APP PROJECT -> SUPABASE ROW
========================================================= */

function mapProjectPayload(project = {}) {
  return {
    incoming_number:
      project.incomingNumber ||
      project.incoming_number ||
      "",

    incoming_date:
      project.incomingDate ||
      project.incoming_date ||
      null,

    outgoing_number:
      project.outgoingNumber ||
      project.outgoing_number ||
      "",

    outgoing_date:
      project.outgoingDate ||
      project.outgoing_date ||
      null,

    doc_number:
      project.docNumber ||
      project.doc_number ||
      "",

    doc_name:
      project.docName ||
      project.doc_name ||
      project.name ||
      "",

    doc_date:
      project.docDate ||
      project.doc_date ||
      null,

    event_name:
      project.eventName ||
      project.event_name ||
      project.name ||
      project.docName ||
      project.doc_name ||
      "Nomsiz project",

    mechanism:
      project.mechanism ||
      "",

    implementation_form:
      project.implementationForm ||
      project.implementation_form ||
      "",

    author:
      project.author ||
      "",

    executors:
      project.executors ||
      "",

    deadline:
      project.deadline ||
      null,

    status:
      project.status ||
      "active"
  };
}

/* =========================================================
   LOAD PROJECTS
========================================================= */

async function loadProjects() {
  const { data, error } = await supabaseClient
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("SUPABASE LOAD PROJECTS ERROR:", error);
    throw new Error(error.message || "Projectlar yuklanmadi");
  }

  AppState.projects = (data || []).map(mapSupabaseProject);

  return AppState.projects;
}

/* =========================================================
   CREATE PROJECT
========================================================= */

async function createProject(data) {
  const payload = mapProjectPayload(data);

  const { data: created, error } = await supabaseClient
    .from("projects")
    .insert(payload)
    .select();

  if (error) {
    console.error("SUPABASE CREATE PROJECT ERROR:", error);
    throw new Error(error.message || "Project qo‘shilmadi");
  }

  if (!created || created.length === 0) {
    throw new Error("Project qo‘shildi, lekin qaytgan ma’lumot topilmadi. Supabase SELECT policy tekshiring.");
  }

  return mapSupabaseProject(created[0]);
}

/* =========================================================
   UPDATE PROJECT
========================================================= */

async function updateProject(id, data) {
  const payload = {
    ...mapProjectPayload(data),
    updated_at: new Date().toISOString()
  };

  const { data: updated, error } = await supabaseClient
    .from("projects")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) {
    console.error("SUPABASE UPDATE PROJECT ERROR:", error);
    throw new Error(error.message || "Project yangilanmadi");
  }

  if (!updated || updated.length === 0) {
    throw new Error("Project yangilanmadi. ID topilmadi yoki Supabase UPDATE/SELECT policy ruxsat bermayapti.");
  }

  return mapSupabaseProject(updated[0]);
}

/* =========================================================
   DELETE PROJECT
========================================================= */

async function removeProject(id) {
  const { error } = await supabaseClient
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("SUPABASE DELETE PROJECT ERROR:", error);
    throw new Error(error.message || "Project o‘chirilmadi");
  }

  return true;
}