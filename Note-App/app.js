// --- State ---
const STORAGE_KEY = "notesapp.v1";
let state = load() || {
  color: "#10b981",   // varsayılan renk: Emerald
  notes: []           // { id, text, color, createdAt }
};

// --- DOM ---
const el = {
  search: document.getElementById("search"),
  input: document.getElementById("note-input"),
  palette: document.getElementById("color-palette"),
  addBtn: document.getElementById("add-btn"),
  list: document.getElementById("notes"),
};

// --- Utils ---
function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function load(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; }
}
function uid(){ return crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36)+Math.random().toString(36).slice(2); }
function fmtDate(ts){ return new Date(ts).toLocaleString(); }

// --- Render ---
function renderPalette(){
  // seçili rengi vurgula
  [...el.palette.querySelectorAll(".swatch")].forEach(b=>{
    b.classList.toggle("selected", b.dataset.color === state.color);
  });
}

function renderNotes(){
  const q = (el.search.value || "").trim().toLowerCase();

  el.list.innerHTML = "";
  const frag = document.createDocumentFragment();

  state.notes
    .filter(n => n.text.toLowerCase().includes(q))
    .forEach(n => {
      const li = document.createElement("li");
      li.className = "note card";
      li.style.borderLeftColor = n.color;
      li.innerHTML = `
        <div class="text">${escapeHtml(n.text)}</div>
        <div class="meta">
          <span>${fmtDate(n.createdAt)}</span>
          <div class="actions">
            <button class="btn delete" data-action="delete" data-id="${n.id}">Delete</button>
          </div>
        </div>
      `;
      frag.appendChild(li);
    });

  el.list.appendChild(frag);
}

function escapeHtml(str){
  return str.replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[m]));
}

// --- Actions ---
function addNote(){
  const text = (el.input.value || "").trim();
  if(!text) return;

  state.notes.unshift({
    id: uid(),
    text,
    color: state.color,
    createdAt: Date.now()
  });

  el.input.value = "";
  save();
  renderNotes();
}

function deleteNote(id){
  state.notes = state.notes.filter(n => n.id !== id);
  save();
  renderNotes();
}

// --- Events ---
el.palette.addEventListener("click", (e)=>{
  const btn = e.target.closest(".swatch");
  if(!btn) return;
  state.color = btn.dataset.color;
  renderPalette();
  save();
});

el.addBtn.addEventListener("click", addNote);
el.input.addEventListener("keydown", (e)=>{
  if(e.metaKey && e.key === "Enter") addNote(); // Mac: ⌘ + Enter
  if(e.ctrlKey && e.key === "Enter") addNote(); // Win/Linux: Ctrl + Enter
});

el.search.addEventListener("input", renderNotes);

el.list.addEventListener("click", (e)=>{
  const btn = e.target.closest("[data-action='delete']");
  if(!btn) return;
  deleteNote(btn.dataset.id);
});

// --- Init ---
renderPalette();
renderNotes();
