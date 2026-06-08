/* =========================================================
   DASHBOARD / KPI / CALENDAR / TIMELINE
========================================================= */

function renderTimeline() {
  const { timelineEl } = AppEls;
  const { projects } = AppState;

  if (!timelineEl) return;

  timelineEl.innerHTML = "";

  if (!projects || projects.length === 0) {
    timelineEl.innerHTML = `
      <div class="timeline-empty">
        <i class="ri-time-line"></i>
        <h4>Timeline bo‘sh</h4>
        <p>Hali project qo‘shilmagan. Project qo‘shilgandan keyin muddatlar shu yerda ko‘rinadi.</p>
      </div>
    `;
    return;
  }

  [...projects]
    .filter(project => project.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .forEach(project => {
      timelineEl.innerHTML += `
        <div class="timeline-item">
          <div class="timeline-dot dot-${escapeHTML(project.status || "active")}"></div>

          <div class="timeline-content">
            <strong>${escapeHTML(project.name || "Nomsiz loyiha")}</strong>

            <div class="timeline-date ${overdue(project.deadline) ? "overdue" : ""}">
              <i class="ri-calendar-line"></i>
              ${escapeHTML(project.deadline || "")}
            </div>
          </div>
        </div>
      `;
    });
}

/* =========================================================
   CALENDAR
========================================================= */

function renderCalendar() {
  const calendarEl = document.getElementById("calendar");

  if (!calendarEl) return;

  const events = AppState.projects
    .filter(project => project.deadline)
    .map(project => ({
      title: project.name || "Nomsiz loyiha",
      start: project.deadline,
      color:
        project.status === "completed" ? "#16a34a" :
        project.status === "risk" ? "#dc2626" :
        "#4f46e5"
    }));

  if (AppState.calendar) {
    AppState.calendar.removeAllEvents();
    AppState.calendar.addEventSource(events);

    setTimeout(() => {
      AppState.calendar.updateSize();
    }, 50);

    return;
  }

  AppState.calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",

    /* Muhim: auto emas, 100% bo‘lishi kerak */
    height: "100%",
    expandRows: true,

    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek"
    },

    buttonText: {
      today: "Bugun",
      month: "Oy",
      week: "Hafta"
    },

    events,

    eventClick(info) {
      alert(
        "Loyiha: " + info.event.title +
        "\nSana: " + info.event.start.toLocaleDateString()
      );
    }
  });

  AppState.calendar.render();

  setTimeout(() => {
    AppState.calendar.updateSize();
  }, 50);
}

/* =========================================================
   KPI
========================================================= */

function calcTrend(current, old) {
  if (old === 0) {
    return current > 0 ? 100 : 0;
  }

  return Math.round(((current - old) / old) * 100);
}

function setTrend(el, value) {
  if (!el) return;

  if (value >= 0) {
    el.className = "trend up";
    el.innerText = `↑ ${value}%`;
  } else {
    el.className = "trend down";
    el.innerText = `↓ ${Math.abs(value)}%`;
  }
}

function updateKPI() {
  const { projects } = AppState;

  const total = projects.length;
  const active = projects.filter(project => project.status === "active").length;
  const completed = projects.filter(project => project.status === "completed").length;
  const risk = projects.filter(project => project.status === "risk").length;

  if (AppEls.totalCount) AppEls.totalCount.innerText = total;
  if (AppEls.activeCount) AppEls.activeCount.innerText = active;
  if (AppEls.completedCount) AppEls.completedCount.innerText = completed;
  if (AppEls.riskCount) AppEls.riskCount.innerText = risk;

  if (AppEls.projectBadge) {
    AppEls.projectBadge.innerText = total;
  }

  const oldTotal = total - 2 < 0 ? 0 : total - 2;
  const oldActive = active - 1 < 0 ? 0 : active - 1;
  const oldCompleted = completed - 1 < 0 ? 0 : completed - 1;
  const oldRisk = risk - 1 < 0 ? 0 : risk - 1;

  setTrend(AppEls.totalTrend, calcTrend(total, oldTotal));
  setTrend(AppEls.activeTrend, calcTrend(active, oldActive));
  setTrend(AppEls.completedTrend, calcTrend(completed, oldCompleted));
  setTrend(AppEls.riskTrend, calcTrend(risk, oldRisk));
}

/* =========================================================
   RENDER DASHBOARD
========================================================= */

function renderDashboardSection() {
  renderTimeline();
  updateKPI();
  renderCalendar();

  if (AppState.calendar) {
    setTimeout(() => {
      AppState.calendar.updateSize();
    }, 100);
  }
}