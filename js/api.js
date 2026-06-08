async function apiRequest(url, options = {}) {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  let data = null;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const msg =
      data?.details?.join("\n") ||
      data?.error ||
      "Server xatolik berdi";

    throw new Error(msg);
  }

  return data;
}

async function loadProjects() {
  AppState.projects = await apiRequest(API_URL);
}

async function createProject(data) {
  return apiRequest(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });
}

async function updateProject(id, data) {
  return apiRequest(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}

async function removeProject(id) {
  return apiRequest(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}