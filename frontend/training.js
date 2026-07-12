// IBM Maximo (MAS) training enrollment — course selection, fee calculation, and submission.

const SINGLE_COURSES = [
  { id: "s1", name: "MAS Deployment", sessions: 6, hours: 12, fee: 8000 },
  { id: "s2", name: "MAS Administration", sessions: 6, hours: 12, fee: 5000 },
  { id: "s3", name: "MAS Technical", sessions: 6, hours: 12, fee: 6000 },
  { id: "s4", name: "MAS Functional", sessions: 6, hours: 12, fee: 6000 },
  { id: "s5", name: "Automation Script", sessions: 6, hours: 12, fee: 4000 },
  { id: "s6", name: "BIRT Report", sessions: 6, hours: 12, fee: 4000 },
  { id: "s7", name: "Upgrade", sessions: 6, hours: 12, fee: 8000 },
];

const COMBO_PACKAGES = [
  { id: "c1", name: "Deployment", sessions: 6, hours: 12, fee: 8000 },
  { id: "c2", name: "Deployment + Administration", sessions: 12, hours: 24, fee: 12000 },
  { id: "c3", name: "+ Technical", sessions: 18, hours: 36, fee: 16000 },
  { id: "c4", name: "+ Functional", sessions: 24, hours: 48, fee: 20000 },
  { id: "c5", name: "+ Automation Script", sessions: 30, hours: 60, fee: 23000 },
  { id: "c6", name: "+ BIRT Report", sessions: 36, hours: 72, fee: 25000 },
  { id: "c7", name: "+ Upgrade (full package)", sessions: 42, hours: 84, fee: 30000 },
];

// Replace with your business WhatsApp number (country code, no + or spaces).
const WHATSAPP_NUMBER = "919988776644";

const BATCH_LABELS = {
  weekend: "Weekend · Sat & Sun · 8:00–10:00 AM",
  weekday: "Weekday · Mon–Fri · 9:00–11:00 PM",
};

const API_BASE =
  window.RYKLO_API_BASE ||
  (window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3001"
    : "");

let selectedCourse = null;
let selectedBatch = null;

const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");

const findCourse = (id) =>
  SINGLE_COURSES.find((c) => c.id === id) ||
  COMBO_PACKAGES.find((c) => c.id === id);

function renderCourseGrid(list, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = list
    .map(
      (c) => `
      <button type="button" class="course-card" data-id="${c.id}">
        <span class="course-info">
          <span class="course-name">${c.name}</span>
          <span class="course-meta">${c.sessions} sessions · ${c.hours}h</span>
        </span>
        <span class="course-fee">${inr(c.fee)}</span>
      </button>`
    )
    .join("");

  el.querySelectorAll(".course-card").forEach((card) => {
    card.addEventListener("click", () => selectCourse(card.dataset.id));
  });
}

function renderFeeTable() {
  const body = document.getElementById("fee-table-body");
  if (!body) return;
  const row = (c, type) => `
    <tr>
      <td>${c.name}</td>
      <td>${type}</td>
      <td>${c.sessions}</td>
      <td>${c.hours}</td>
      <td class="ta-right">${Number(c.fee).toLocaleString("en-IN")}</td>
    </tr>`;
  body.innerHTML =
    SINGLE_COURSES.map((c) => row(c, "Single")).join("") +
    COMBO_PACKAGES.map((c) => row(c, "Package")).join("");
}

function selectCourse(id) {
  selectedCourse = findCourse(id);
  document.querySelectorAll(".course-card").forEach((el) => {
    el.classList.toggle("active", el.dataset.id === id);
    el.setAttribute("aria-pressed", String(el.dataset.id === id));
  });
  document.getElementById("course-count").textContent = "1 selected";
  updateSummary();
}

function selectBatch(type) {
  selectedBatch = type;
  document.querySelectorAll(".batch-card").forEach((el) => {
    el.classList.toggle("active", el.dataset.batch === type);
    el.setAttribute("aria-pressed", String(el.dataset.batch === type));
  });
  updateSummary();
}

function formatDate(val) {
  if (!val) return null;
  const d = new Date(val + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function updateSummary() {
  const name = document.getElementById("f-name").value.trim();
  setText("t-name", name || "—");

  if (selectedCourse) {
    setText("t-course", selectedCourse.name);
    setText("t-sessions", selectedCourse.sessions + " sessions");
    setText("t-hours", selectedCourse.hours + " hours");
    setText("t-fee", inr(selectedCourse.fee));
  } else {
    setText("t-course", "Not selected");
    setText("t-sessions", "—");
    setText("t-hours", "—");
    setText("t-fee", "₹0");
  }

  const dateVal = document.getElementById("f-date").value;
  setText(
    "t-batch",
    selectedBatch ? BATCH_LABELS[selectedBatch].split(" · ").slice(0, 2).join(" · ") : "Not selected"
  );
  setText("t-date", formatDate(dateVal) || "—");

  const ready = Boolean(selectedCourse && selectedBatch && dateVal && name);
  document.getElementById("btn-submit").disabled = !ready;
  document.getElementById("btn-whatsapp").disabled = !(selectedCourse && selectedBatch);
}

function buildEnrollmentText() {
  const name = document.getElementById("f-name").value.trim();
  const phone = document.getElementById("f-phone").value.trim();
  const dateLabel = formatDate(document.getElementById("f-date").value) || "not set";
  return `MAS Training enrollment request
Name: ${name}
Phone: ${phone}
Course: ${selectedCourse.name}
Sessions: ${selectedCourse.sessions} (${selectedCourse.hours} hrs)
Batch: ${BATCH_LABELS[selectedBatch]}
Start date: ${dateLabel}
Fee: ${inr(selectedCourse.fee)}`;
}

function confirmViaWhatsapp() {
  if (!selectedCourse || !selectedBatch) return;
  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(buildEnrollmentText());
  window.open(url, "_blank", "noopener");
}

function showStatus(message, type) {
  const el = document.getElementById("status-msg");
  if (!el) return;
  el.textContent = message;
  el.className = "summary-status show status-" + type;
}

async function submitEnrollment(event) {
  event.preventDefault();
  if (!selectedCourse || !selectedBatch) return;

  const btn = document.getElementById("btn-submit");
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Reserving…";

  const payload = {
    name: document.getElementById("f-name").value.trim(),
    email: document.getElementById("f-email").value.trim(),
    phone: document.getElementById("f-phone").value.trim(),
    course: selectedCourse.name,
    sessions: selectedCourse.sessions,
    hours: selectedCourse.hours,
    fee: selectedCourse.fee,
    batch: BATCH_LABELS[selectedBatch],
    startDate: document.getElementById("f-date").value,
  };

  try {
    const res = await fetch(`${API_BASE}/api/enroll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Failed to reserve seat.");
    showStatus("Seat reserved! Our team will reach out to confirm your enrollment.", "ok");
    btn.textContent = "Reserved!";
  } catch (err) {
    console.error(err);
    showStatus(err.message || "Could not reserve your seat. Please try again.", "error");
    btn.textContent = "Try again";
    btn.disabled = false;
    return;
  } finally {
    if (btn.textContent === "Reserving…") btn.textContent = originalText;
  }
}

function init() {
  renderCourseGrid(SINGLE_COURSES, "single-grid");
  renderCourseGrid(COMBO_PACKAGES, "combo-grid");
  renderFeeTable();

  const wo = String(Math.floor(Math.random() * 9999)).padStart(4, "0");
  setText("wo-number", "WO-2026-" + wo);

  document.querySelectorAll(".batch-card").forEach((card) => {
    card.addEventListener("click", () => selectBatch(card.dataset.batch));
  });

  ["f-name", "f-phone", "f-email", "f-date"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updateSummary);
  });

  document.getElementById("btn-whatsapp").addEventListener("click", confirmViaWhatsapp);
  document.getElementById("enroll-form").addEventListener("submit", submitEnrollment);

  updateSummary();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
