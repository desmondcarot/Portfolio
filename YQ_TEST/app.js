"use strict";

const STORAGE_KEY = "youthquake-demo-v1";
const people = [
  { id: "YQ-001", name: "Hannah Lim", age: 17, church: "Wesley Methodist Church KL", gender: "Female", shirt: "M", workshops: "Worship & Creative Arts", devotion: "Grace", team: "Team Radiant", remarks: "No special requirements", emergency: "Sarah Lim · 012-555 0101", checkedIn: true, signature: true, phoneReceived: true, shirtGiven: true, packGiven: true, phoneDescription: "Black smartphone", phoneLocation: "Box A · 01" },
  { id: "YQ-002", name: "Daniel Tan", age: 16, church: "Trinity Methodist Church PJ", gender: "Male", shirt: "L", workshops: "Leadership in Action", devotion: "Hope", team: "Team Brave", remarks: "Peanut allergy", emergency: "David Tan · 012-555 0102", checkedIn: true, signature: true, phoneReceived: true, shirtGiven: true, packGiven: true, phoneDescription: "Blue smartphone", phoneLocation: "Box A · 02" },
  { id: "YQ-003", name: "Chloe Lee", age: 18, church: "Wesley Methodist Church Ipoh", gender: "Female", shirt: "S", workshops: "Faith & Everyday Life", devotion: "Joy", team: "Team Radiant", remarks: "Vegetarian meals", emergency: "Michelle Lee · 012-555 0103" },
  { id: "YQ-004", name: "Joshua Wong", age: 15, church: "Kampung Tunku Methodist Church", gender: "Male", shirt: "M", workshops: "Worship & Creative Arts", devotion: "Faith", team: "Team Wonder", remarks: "No special requirements", emergency: "Peter Wong · 012-555 0104" },
  { id: "YQ-005", name: "Abigail Ng", age: 17, church: "Trinity Methodist Church PJ", gender: "Female", shirt: "M", workshops: "Leadership in Action", devotion: "Grace", team: "Team Brave", remarks: "No special requirements", emergency: "Anna Ng · 012-555 0105" },
  { id: "YQ-006", name: "Marcus Chua", age: 16, church: "Wesley Methodist Church Penang", gender: "Male", shirt: "L", workshops: "Faith & Everyday Life", devotion: "Hope", team: "Team Wonder", remarks: "No special requirements", emergency: "James Chua · 012-555 0106" },
  { id: "YQ-007", name: "Esther Teo", age: 18, church: "Wesley Methodist Church KL", gender: "Female", shirt: "S", workshops: "Leadership in Action", devotion: "Joy", team: "Team Brave", remarks: "Seafood allergy", emergency: "Grace Teo · 012-555 0107" },
  { id: "YQ-008", name: "Isaac Goh", age: 17, church: "Wesley Methodist Church Ipoh", gender: "Male", shirt: "XL", workshops: "Worship & Creative Arts", devotion: "Faith", team: "Team Radiant", remarks: "No special requirements", emergency: "Rachel Goh · 012-555 0108" }
];

const extraNames = [
  ["Amelia Koh", "Female"], ["Ethan Chan", "Male"], ["Olivia Yeo", "Female"], ["Caleb Ong", "Male"],
  ["Sophia Chew", "Female"], ["Nathan Low", "Male"], ["Alyssa Pang", "Female"], ["Lucas Foo", "Male"],
  ["Rachel Lau", "Female"], ["Benjamin Ho", "Male"], ["Jack Coo", "Male"], ["Samuel Tay", "Male"],
  ["Jasmine Yip", "Female"], ["Aaron Loh", "Male"], ["Natalie Sim", "Female"], ["Matthew Kwan", "Male"],
  ["Deborah Liew", "Female"], ["Jonathan Chong", "Male"], ["Megan Yap", "Female"], ["Elijah Lim", "Male"],
  ["Sarah Ng", "Female"], ["Noah Tan", "Male"], ["Grace Lee", "Female"], ["Adam Wong", "Male"],
  ["Hannah Chia", "Female"], ["Joel Tan", "Male"], ["Rebecca Goh", "Female"], ["Joseph Lee", "Male"],
  ["Faith Ong", "Female"], ["Timothy Ng", "Male"], ["Abigail Lim", "Female"], ["Evan Teo", "Male"],
  ["Hannah Chan", "Female"], ["David Cheong", "Male"], ["Ruth Low", "Female"], ["Andrew Yap", "Male"],
  ["Joanna Foo", "Female"], ["Nicholas Ong", "Male"], ["Charis Tan", "Female"], ["Gabriel Lim", "Male"],
  ["Bethany Lee", "Female"], ["Ryan Goh", "Male"]
];
const churches = ["Wesley Methodist Church KL", "Trinity Methodist Church PJ", "Wesley Methodist Church Ipoh", "Kampung Tunku Methodist Church", "Wesley Methodist Church Penang"];
const workshopOptions = [
  ["Worship & Creative Arts", "Leadership in Action", "Faith & Everyday Life"],
  ["Prayer & Reflection", "Serving Our Community", "Music & Worship"],
  ["Living Your Faith", "Building Friendships", "Creative Storytelling"]
];
const devotionGroups = ["D1", "D2", "D3", "D4"];
const teamGroups = ["T1", "T2", "T3"];
const sizes = ["S", "M", "L", "XL"];

extraNames.forEach(([name, gender], index) => {
  const number = index + 9;
  people.push({
    id: `YQ-${String(number).padStart(3, "0")}`, name, age: 15 + index % 4, gender,
    church: churches[index % churches.length], shirt: sizes[index % sizes.length],
    workshops: workshopOptions[0][index % workshopOptions[0].length], devotion: devotionGroups[index % devotionGroups.length],
    team: teamGroups[index % teamGroups.length], remarks: "No special requirements",
    emergency: `Demo contact · 012-555 ${String(number).padStart(4, "0")}`
  });
});

const defaultPeople = () => people.map((person, index) => ({
  signature: false, phoneReceived: false, shirtGiven: false, packGiven: false,
  phoneDescription: "", phoneLocation: "", phoneCollectedAt: "", phoneReturnedAt: "",
  noPhone: false, shirtPending: false, followUp: false, followUpNote: "", checkedIn: false, ...person,
  workshops: [
    person.workshops,
    workshopOptions[1][Math.floor(index / 3) % 3],
    workshopOptions[2][Math.floor(index / 9) % 3]
  ]
}));

let participants = defaultPeople();
let activity = [];
let selectedId = null;
let toastTimer;
let editingField = null;
const $ = id => document.getElementById(id);
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[char]);
const initials = name => name.split(" ").map(part => part[0]).slice(0, 2).join("").toUpperCase();
const needsAttention = person => person.shirtPending || person.followUp;
const status = person => `<span class="status ${person.checkedIn ? "checked" : "pending"}">${person.checkedIn ? "Checked in" : "Yet to arrive"}</span>${needsAttention(person) ? ' <span class="status attention">Needs attention</span>' : ""}`;
const personCell = person => `<div class="person-cell"><span class="avatar">${escapeHtml(initials(person.name))}</span><span><strong>${escapeHtml(person.name)}</strong><small>${escapeHtml(person.id)}</small></span></div>`;
const ready = person => person.signature && person.packGiven &&
  (person.noPhone || (person.phoneReceived && person.phoneDescription.trim() && person.phoneLocation.trim())) &&
  (person.shirtGiven || person.shirtPending);
const formatTime = value => value ? new Date(value).toLocaleString("en-MY", { dateStyle: "medium", timeStyle: "short" }) : "Not recorded";

function notify(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3500);
}

function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const stored = JSON.parse(saved);
      const parsed = Array.isArray(stored) ? stored : stored.participants;
      if (!Array.isArray(stored)) {
        if (!Array.isArray(stored.activity) || stored.activity.some(entry =>
          !entry || !["check-in", "checklist", "phone", "workspace"].includes(entry.type) ||
          typeof entry.timestamp !== "string" || Number.isNaN(Date.parse(entry.timestamp)) ||
          typeof entry.personId !== "string" || typeof entry.description !== "string"
        )) throw new Error("Invalid activity data");
        activity = stored.activity;
      }
      if (!Array.isArray(parsed) || ![8, people.length].includes(parsed.length) || parsed.some((person, index) =>
        !person || person.id !== people[index].id ||
        !["signature", "phoneReceived", "shirtGiven", "packGiven", "checkedIn"].every(key => typeof person[key] === "boolean") ||
        !["phoneDescription", "phoneLocation"].every(key => typeof person[key] === "string") ||
        !["noPhone", "shirtPending", "followUp"].every(key => person[key] === undefined || typeof person[key] === "boolean") ||
        !["followUpNote", "phoneCollectedAt", "phoneReturnedAt"].every(key => person[key] === undefined || typeof person[key] === "string") ||
        !(typeof person.workshops === "string" && person.workshops.trim() ||
          Array.isArray(person.workshops) && person.workshops.length === 3 &&
          person.workshops.every(choice => typeof choice === "string" && choice.trim()))
      )) throw new Error("Invalid demo data");
      const defaults = defaultPeople();
      const needsMigration = Array.isArray(stored) || parsed.length !== people.length || parsed.some(person => typeof person.workshops === "string" || person.noPhone === undefined);
      participants = [
        ...parsed.map((person, index) => ({
          noPhone: false, shirtPending: false, followUp: false, followUpNote: "", phoneCollectedAt: "", phoneReturnedAt: "",
          ...person,
          workshops: typeof person.workshops === "string"
            ? [person.workshops, ...defaults[index].workshops.slice(1)] : person.workshops
        })),
        ...defaults.slice(parsed.length)
      ];
      if (needsMigration) save();
    }
  } catch (error) {
    console.error("Could not load saved demo data:", error);
    notify("Saved demo data could not be loaded. Using sample data.");
  }
}

function save(entries = []) {
  try {
    const updatedActivity = [...entries, ...activity].slice(0, 500);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ participants, activity: updatedActivity }));
    activity = updatedActivity;
    return true;
  } catch (error) {
    console.error("Could not save demo data:", error);
    notify("Changes could not be saved in this browser.");
    return false;
  }
}

function activityEntry(type, person, description) {
  return { timestamp: new Date().toISOString(), type, personId: person ? person.id : "", description };
}

function renderActivity() {
  const search = $("activity-search").value.trim().toLowerCase();
  const filter = $("activity-filter").value;
  const rows = activity.filter(entry => {
    const person = participants.find(item => item.id === entry.personId);
    return (filter === "all" || entry.type === filter) &&
      `${person ? person.name : ""} ${entry.personId} ${entry.description}`.toLowerCase().includes(search);
  });
  $("activity-count").textContent = `${rows.length} shown`;
  $("activity-table").innerHTML = rows.length ? rows.map(entry => {
    const person = participants.find(item => item.id === entry.personId);
    return `<tr><td>${escapeHtml(formatTime(entry.timestamp))}</td><td>${person ? personCell(person) : entry.personId ? escapeHtml(entry.personId) : "Workspace"}</td><td>${escapeHtml(entry.description)}</td><td>${person ? `<button class="row-action open-person" data-id="${escapeHtml(person.id)}" aria-label="Open ${escapeHtml(person.name)} at check-in"><i class="bi bi-arrow-up-right"></i></button>` : ""}</td></tr>`;
  }).join("") : '<tr><td colspan="4" class="empty-state">No activity to show. Actions made before this log was added are not available.</td></tr>';
}

function renderDashboard() {
  const total = participants.length;
  const checked = participants.filter(person => person.checkedIn).length;
  const phones = participants.filter(person => person.phoneReceived && !person.phoneReturnedAt).length;
  const percentage = total ? Math.round(checked / total * 100) : 0;
  $("stat-total").textContent = total;
  $("stat-checked").textContent = checked;
  $("stat-pending").textContent = total - checked;
  $("stat-phones").textContent = phones;
  $("progress-percent").textContent = `${percentage}%`;
  $("progress-count").textContent = `${checked} of ${total} participants`;
  $("progress-bar").style.width = `${percentage}%`;
  $("overview-table").innerHTML = participants.slice(0, 5).map(person => `<tr><td>${personCell(person)}</td><td>${escapeHtml(person.church)}</td><td>${status(person)}</td><td><button class="row-action open-person" data-id="${escapeHtml(person.id)}" aria-label="Open ${escapeHtml(person.name)} at check-in"><i class="bi bi-arrow-up-right"></i></button></td></tr>`).join("");
}

function matches(person, search) {
  return `${person.name} ${person.church} ${person.id}`.toLowerCase().includes(search.trim().toLowerCase());
}

function renderDeskList() {
  const filtered = participants.filter(person => matches(person, $("desk-search").value));
  $("desk-count").textContent = `${filtered.length} people`;
  $("desk-results").innerHTML = filtered.length ? filtered.map(person => `<button type="button" class="desk-person ${person.id === selectedId ? "selected" : ""}" data-id="${escapeHtml(person.id)}" aria-pressed="${person.id === selectedId}">${personCell(person)}<i class="bi bi-chevron-right"></i></button>`).join("") : '<div class="empty-state">No participants found. Try another search.</div>';
}

function renderDirectory() {
  const filter = $("status-filter").value;
  const filtered = participants.filter(person => matches(person, $("participant-search").value) && (filter === "all" || (filter === "checked" ? person.checkedIn : filter === "attention" ? needsAttention(person) : !person.checkedIn)));
  $("participant-count").textContent = filtered.length;
  $("participants-table").innerHTML = filtered.length ? filtered.map(person => `<tr><td>${personCell(person)}</td><td>${escapeHtml(person.church)}</td><td>${escapeHtml(person.shirt)}</td><td>${escapeHtml(person.devotion)}</td><td>${status(person)}</td><td><button class="row-action open-person" data-id="${escapeHtml(person.id)}" aria-label="Open ${escapeHtml(person.name)} at check-in"><i class="bi bi-arrow-up-right"></i></button></td></tr>`).join("") : '<tr><td colspan="6" class="empty-state">No participants match your search.</td></tr>';
}

function renderGroups() {
  [
    { key: "devotion", list: "devotion-group-list", summary: "devotion-summary" },
    { key: "team", list: "team-group-list", summary: "team-summary" }
  ].forEach(({ key, list, summary }) => {
    const container = $(list);
    const openGroups = new Set(Array.from(container.querySelectorAll("details[open]"), detail => detail.dataset.group));
    const groups = new Map();
    participants.forEach(person => {
      if (!groups.has(person[key])) groups.set(person[key], []);
      groups.get(person[key]).push(person);
    });
    $(summary).textContent = `${groups.size} groups · ${participants.length} participants`;
    container.innerHTML = Array.from(groups, ([name, members]) => {
      const checked = members.filter(person => person.checkedIn).length;
      return `<details class="panel group-card" data-group="${escapeHtml(name)}" ${openGroups.has(name) ? "open" : ""}>
        <summary><span class="group-icon ${key === "devotion" ? "purple" : "blue"}"><i class="bi ${key === "devotion" ? "bi-book" : "bi-people"}"></i></span>
          <span class="group-name"><strong>${escapeHtml(name)}</strong><small>${members.length} participants · ${checked} checked in</small></span><i class="bi bi-chevron-down group-chevron"></i></summary>
        <div class="table-wrap"><table class="data-table"><thead><tr><th>PARTICIPANT</th><th>CHURCH</th><th>STATUS</th><th></th></tr></thead><tbody>
          ${members.map(person => `<tr><td>${personCell(person)}</td><td>${escapeHtml(person.church)}</td><td>${status(person)}</td><td><button class="row-action open-person" data-id="${escapeHtml(person.id)}" aria-label="Open ${escapeHtml(person.name)} at check-in"><i class="bi bi-arrow-up-right"></i></button></td></tr>`).join("")}
        </tbody></table></div></details>`;
    }).join("");
  });
}

function renderWorkshops() {
  const day = Number($("workshop-day").value);
  const container = $("workshop-list");
  const open = new Set(Array.from(container.querySelectorAll("details[open]"), detail => detail.dataset.group));
  const names = [...new Set([...workshopOptions[day], ...participants.map(person => person.workshops[day])])];
  container.innerHTML = names.map(name => {
    const members = participants.filter(person => person.workshops[day] === name);
    const checked = members.filter(person => person.checkedIn).length;
    return `<details class="panel group-card" data-group="${escapeHtml(name)}" ${open.has(name) ? "open" : ""}>
      <summary><span class="group-icon purple"><i class="bi bi-calendar3"></i></span><span class="group-name"><strong>${escapeHtml(name)}</strong><small>${members.length} participants · ${checked} checked in</small></span><i class="bi bi-chevron-down group-chevron"></i></summary>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>PARTICIPANT</th><th>CHURCH</th><th>STATUS</th><th></th></tr></thead><tbody>${members.length ? members.map(person => `<tr><td>${personCell(person)}</td><td>${escapeHtml(person.church)}</td><td>${status(person)}</td><td><button class="row-action open-person" data-id="${escapeHtml(person.id)}" aria-label="Open ${escapeHtml(person.name)} at check-in"><i class="bi bi-arrow-up-right"></i></button></td></tr>`).join("") : '<tr><td colspan="4" class="empty-state">No participants in this workshop.</td></tr>'}</tbody></table></div></details>`;
  }).join("");
}

function renderPhones() {
  const search = $("phone-search").value.trim().toLowerCase();
  const filter = $("phone-filter").value;
  const filtered = participants.filter(person => person.phoneReceived &&
    `${person.name} ${person.id} ${person.church} ${person.phoneLocation}`.toLowerCase().includes(search) &&
    (filter === "all" || (filter === "returned" ? !!person.phoneReturnedAt : !person.phoneReturnedAt)));
  $("phone-count").textContent = `${filtered.length} shown`;
  $("phone-table").innerHTML = filtered.length ? filtered.map(person => `<tr><td>${personCell(person)}</td><td>${escapeHtml(person.phoneDescription || "Not recorded")}</td><td>${escapeHtml(person.phoneLocation || "Not recorded")}</td><td>${escapeHtml(formatTime(person.phoneCollectedAt))}</td><td>${person.phoneReturnedAt ? `<span class="status checked">Returned</span><small class="phone-time">${escapeHtml(formatTime(person.phoneReturnedAt))}</small>` : '<span class="status pending">In custody</span>'}</td><td><button type="button" class="btn-secondary-custom phone-action" data-id="${escapeHtml(person.id)}">${person.phoneReturnedAt ? "Undo return" : "Mark returned"}</button></td></tr>`).join("") : '<tr><td colspan="6" class="empty-state">No collected phones match your search.</td></tr>';
}

function infoItem(label, value) {
  return `<div class="info-item"><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function renderDetail() {
  const person = participants.find(item => item.id === selectedId);
  if (!person) {
    $("detail-panel").innerHTML = '<div class="empty-detail"><div><i class="bi bi-person-vcard"></i><h2>Let’s find someone</h2><p>Select a participant on the left to see their details.</p></div></div>';
    return;
  }
  const checkbox = (key, label, disabled = false) => `<label class="check-row"><input type="checkbox" data-field="${key}" ${person[key] ? "checked" : ""} ${disabled ? "disabled" : ""}> <span>${label}</span></label>`;
  $("detail-panel").innerHTML = `
    <div class="detail-heading"><span class="avatar">${escapeHtml(initials(person.name))}</span><div><h2>${escapeHtml(person.name)}</h2><p>${escapeHtml(person.id)} · ${escapeHtml(person.church)}</p></div>${status(person)}</div>
    <div class="detail-section"><h3>Participant details</h3><div class="info-grid">
      ${infoItem("Age", person.age)}${infoItem("Gender", person.gender)}${infoItem("Shirt size", person.shirt)}
      ${infoItem("Devotion group", person.devotion)}${infoItem("Team building group", person.team)}
      ${infoItem("Emergency contact", person.emergency)}
    </div><div class="remarks"><strong>Remarks & requirements</strong>${escapeHtml(person.remarks)}</div></div>
    <div class="detail-section"><h3>Workshop choices</h3><div class="info-grid">
      ${person.workshops.map((choice, index) => infoItem(`Day ${index + 1}`, choice)).join("")}
    </div></div>
    <div class="detail-section"><h3>Arrival checklist</h3><div class="checklist">
      ${checkbox("signature", "Participant has signed the registration sheet")}
      ${checkbox("phoneReceived", "Phone received for safekeeping", !!person.phoneReturnedAt)}
      ${checkbox("noPhone", "Participant has no phone", !!person.phoneReturnedAt)}
      ${checkbox("shirtGiven", "Camp shirt given")}
      ${checkbox("shirtPending", "Shirt unavailable — follow up")}
      ${checkbox("packGiven", "Camp information pack given")}
      ${checkbox("followUp", "Other staff follow-up needed")}
    </div><div class="phone-fields">
      <label class="field-label">PHONE DESCRIPTION<input type="text" data-field="phoneDescription" value="${escapeHtml(person.phoneDescription)}" placeholder="e.g. Black smartphone" ${person.phoneReceived && !person.phoneReturnedAt ? "" : "disabled"}></label>
      <label class="field-label">STORAGE LOCATION<input type="text" data-field="phoneLocation" value="${escapeHtml(person.phoneLocation)}" placeholder="e.g. Box A · 03" ${person.phoneReceived && !person.phoneReturnedAt ? "" : "disabled"}></label>
    </div>${person.phoneReturnedAt ? '<p class="checkin-note">Phone returned. Undo the return in Phone returns before changing its custody details.</p>' : ""}
    <div class="phone-fields"><label class="field-label">FOLLOW-UP DETAILS<input type="text" data-field="followUpNote" value="${escapeHtml(person.followUpNote)}" placeholder="What does staff need to follow up?" ${person.followUp ? "" : "disabled"}></label></div>
    <p class="checkin-note">Signature and information pack are required. Record a phone or select no phone, and give the shirt or flag it for follow-up. This demo does not capture a signature.</p>
    <div class="detail-actions"><button type="button" class="${person.checkedIn ? "btn-secondary-custom" : "btn-primary-custom"}" id="complete-checkin" ${!person.checkedIn && !ready(person) ? "disabled" : ""}>${person.checkedIn ? '<i class="bi bi-arrow-counterclockwise"></i> Undo check-in' : '<i class="bi bi-check2"></i> Complete check-in'}</button><small id="checkin-hint">${person.checkedIn ? "This participant is checked in." : ready(person) ? "Everything is ready." : "Complete all items to continue."}</small></div></div>`;
}

function renderAll() {
  renderDashboard();
  renderDeskList();
  renderDirectory();
  renderDetail();
  renderGroups();
  renderWorkshops();
  renderPhones();
  renderActivity();
}

function showPage() {
  const pages = ["dashboard", "check-in", "participants", "devotion-groups", "team-groups", "workshops", "phone-returns", "activity", "reports"];
  const current = pages.includes(location.hash.slice(1)) ? location.hash.slice(1) : "dashboard";
  document.querySelectorAll(".page").forEach(page => { page.hidden = page.id !== current; });
  document.querySelectorAll("[data-page]").forEach(link => {
    const active = link.dataset.page === current;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  $("breadcrumb").textContent = { dashboard: "Overview", "check-in": "Check-in desk", participants: "Participants", "devotion-groups": "Devotion groups", "team-groups": "Team-building groups", workshops: "Workshops", "phone-returns": "Phone returns", activity: "Activity log", reports: "Reports" }[current];
}

function openPerson(id) {
  selectedId = id;
  $("desk-search").value = "";
  renderDeskList();
  renderDetail();
  location.hash = "check-in";
  showPage();
}

function csvCell(value) {
  let text = String(value == null ? "" : value);
  if (/^[\s]*[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

function downloadCsv(filename, headers, rows) {
  const csv = "\ufeff" + [headers, ...rows].map(row => row.map(csvCell).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  notify("Your CSV download has started.");
}

document.addEventListener("click", event => {
  const openButton = event.target.closest(".open-person");
  if (openButton) openPerson(openButton.dataset.id);
  const deskButton = event.target.closest(".desk-person");
  if (deskButton) {
    selectedId = deskButton.dataset.id;
    renderDeskList();
    renderDetail();
  }
  const phoneButton = event.target.closest(".phone-action");
  if (phoneButton) {
    const person = participants.find(item => item.id === phoneButton.dataset.id);
    if (!person || !person.phoneReceived) return;
    if (!person.phoneReturnedAt && (!person.phoneDescription.trim() || !person.phoneLocation.trim())) {
      notify("Record the phone description and storage location at check-in before returning it.");
      return;
    }
    if (!confirm(person.phoneReturnedAt ? `Undo the phone return for ${person.name}?` : `Confirm that the phone for ${person.name} has been returned?`)) return;
    person.phoneReturnedAt = person.phoneReturnedAt ? "" : new Date().toISOString();
    const saved = save([activityEntry("phone", person, person.phoneReturnedAt ? "Phone returned" : "Phone return undone")]);
    renderAll();
    if (saved) notify(person.phoneReturnedAt ? `Phone return recorded for ${person.name}.` : `Phone return undone for ${person.name}.`);
  }
  if (event.target.closest("#complete-checkin")) {
    const person = participants.find(item => item.id === selectedId);
    if (!person || (!person.checkedIn && !ready(person))) return;
    person.checkedIn = !person.checkedIn;
    const saved = save([activityEntry("check-in", person, person.checkedIn ? "Check-in completed" : "Check-in undone")]);
    renderAll();
    if (saved) notify(person.checkedIn ? `${person.name} is checked in.` : `Check-in undone for ${person.name}.`);
  }
});

$("detail-panel").addEventListener("focusin", event => {
  if (event.target.type === "text") editingField = { field: event.target.dataset.field, personId: selectedId, logged: false };
});

$("detail-panel").addEventListener("input", event => {
  const field = event.target.dataset.field;
  const person = participants.find(item => item.id === selectedId);
  if (!person || !["signature", "phoneReceived", "noPhone", "shirtGiven", "shirtPending", "packGiven", "followUp", "followUpNote", "phoneDescription", "phoneLocation"].includes(field)) return;
  const wasCheckedIn = person.checkedIn;
  const before = { ...person };
  person[field] = event.target.type === "checkbox" ? event.target.checked : event.target.value;
  if (field === "phoneReceived") {
    if (person.phoneReceived) person.noPhone = false;
    person.phoneCollectedAt = person.phoneReceived ? new Date().toISOString() : "";
  }
  if (field === "noPhone" && person.noPhone) {
    person.phoneReceived = false;
    person.phoneCollectedAt = "";
  }
  if (field === "shirtGiven" && person.shirtGiven) person.shirtPending = false;
  if (field === "shirtPending" && person.shirtPending) person.shirtGiven = false;
  if (!ready(person)) person.checkedIn = false;
  const labels = {
    signature: ["Signature confirmation removed", "Signature confirmed"],
    phoneReceived: ["Phone collection removed", "Phone collection recorded"],
    noPhone: ["No-phone status removed", "Participant marked as having no phone"],
    shirtGiven: ["Shirt given confirmation removed", "Shirt given"],
    shirtPending: ["Missing-shirt follow-up cleared", "Shirt marked unavailable"],
    packGiven: ["Pack given confirmation removed", "Information pack given"],
    followUp: ["Staff follow-up cleared", "Staff follow-up requested"]
  };
  const entries = [];
  if (event.target.type === "checkbox") {
    Object.keys(labels).forEach(key => {
      if (before[key] !== person[key]) entries.push(activityEntry(key === "phoneReceived" || key === "noPhone" ? "phone" : "checklist", person, labels[key][person[key] ? 1 : 0]));
    });
  } else if (!editingField || editingField.field !== field || editingField.personId !== person.id || !editingField.logged) {
    const descriptions = { phoneDescription: "Phone description edited", phoneLocation: "Phone storage location edited", followUpNote: "Staff follow-up details edited" };
    entries.push(activityEntry(field === "followUpNote" ? "checklist" : "phone", person, descriptions[field]));
  }
  if (wasCheckedIn && !person.checkedIn) entries.push(activityEntry("check-in", person, "Check-in automatically cleared after checklist change"));
  const saved = save(entries.reverse());
  if (saved && editingField && event.target.type !== "checkbox") editingField.logged = true;
  renderDashboard();
  renderDirectory();
  renderGroups();
  renderWorkshops();
  renderPhones();
  renderActivity();
  if (event.target.type === "checkbox") {
    renderDetail();
  } else if (wasCheckedIn && !person.checkedIn) {
    const position = event.target.selectionStart;
    renderDetail();
    const input = $("detail-panel").querySelector(`[data-field="${field}"]`);
    input.focus();
    if (editingField && saved) editingField.logged = true;
    input.setSelectionRange(position, position);
  } else {
    const button = $("complete-checkin");
    if (button && !person.checkedIn) {
      button.disabled = !ready(person);
      $("checkin-hint").textContent = ready(person) ? "Everything is ready." : "Complete all items to continue.";
    }
  }
});

$("desk-search").addEventListener("input", renderDeskList);
$("participant-search").addEventListener("input", renderDirectory);
$("status-filter").addEventListener("change", renderDirectory);
$("workshop-day").addEventListener("change", renderWorkshops);
$("phone-search").addEventListener("input", renderPhones);
$("phone-filter").addEventListener("change", renderPhones);
$("activity-search").addEventListener("input", renderActivity);
$("activity-filter").addEventListener("change", renderActivity);
$("reset-demo").addEventListener("click", () => {
  if (!confirm("Reset all demo check-in changes to the original sample data?")) return;
  participants = defaultPeople();
  selectedId = null;
  const saved = save([activityEntry("workspace", null, "Demo data reset")]);
  renderAll();
  if (saved) notify("Demo data has been reset.");
});
$("export-participants").addEventListener("click", () => downloadCsv("youthquake-participants.csv",
  ["ID", "Name", "Age", "Church", "Gender", "Shirt size", "Workshop day 1", "Workshop day 2", "Workshop day 3", "Devotion group", "Team building group", "Remarks", "Emergency contact", "Status", "Needs attention", "Signature confirmed", "Phone received", "No phone", "Shirt given", "Shirt pending", "Pack given", "Follow-up needed", "Follow-up details"],
  participants.map(p => [p.id, p.name, p.age, p.church, p.gender, p.shirt, ...p.workshops, p.devotion, p.team, p.remarks, p.emergency, p.checkedIn ? "Checked in" : "Yet to arrive", needsAttention(p) ? "Yes" : "No", p.signature ? "Yes" : "No", p.phoneReceived ? "Yes" : "No", p.noPhone ? "Yes" : "No", p.shirtGiven ? "Yes" : "No", p.shirtPending ? "Yes" : "No", p.packGiven ? "Yes" : "No", p.followUp ? "Yes" : "No", p.followUpNote])));
$("export-phones").addEventListener("click", () => downloadCsv("youthquake-phone-custody.csv",
  ["ID", "Name", "Phone description", "Storage location", "Collected at", "Phone status", "Returned at", "Check-in status"],
  participants.filter(p => p.phoneReceived).map(p => [p.id, p.name, p.phoneDescription, p.phoneLocation, p.phoneCollectedAt || "Not recorded", p.phoneReturnedAt ? "Returned" : "In custody", p.phoneReturnedAt, p.checkedIn ? "Checked in" : "Yet to arrive"])));
window.addEventListener("hashchange", showPage);

$("today").textContent = new Intl.DateTimeFormat("en-MY", { day: "numeric", month: "short", year: "numeric" }).format(new Date());
load();
renderAll();
showPage();
