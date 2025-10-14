// --- ELEMENTLERİ SEÇ ---
const input = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const list = document.querySelector("#todo-list");

// --- LOCAL STORAGE'DAN VERİLERİ AL ---
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// --- LİSTEYİ EKRANA YAZDIR ---
function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    if (todo.done) li.classList.add("done");

    // sol kısım (checkbox ve metin)
    li.innerHTML = `
      <div class="d-flex align-items-center flex-grow-1" onclick="toggleDone(${index})">
        <i class="bi ${todo.done ? 'bi-check-lg' : 'bi-square'}"></i>
        <span class="todo-title">${todo.text}</span>
      </div>
      <button class="icon-btn" onclick="deleteTodo(${index})">
        <i class="bi bi-x-lg"></i>
      </button>
    `;
    list.appendChild(li);
  });
}

// --- TODO EKLE ---
function addTodo() {
  const text = input.value.trim();
  if (text === "") {
    showToast("Lütfen bir görev girin!", "danger");
    return;
  }

  todos.push({ text, done: false });
  input.value = "";
  saveAndRender();
  showToast("Görev eklendi ✅", "success");
}

// --- TODO SİL ---
function deleteTodo(index) {
  todos.splice(index, 1);
  saveAndRender();
  showToast("Görev silindi 🗑️", "warning");
}

// --- TAMAMLANDI DURUMU DEĞİŞTİR ---
function toggleDone(index) {
  todos[index].done = !todos[index].done;
  saveAndRender();
}

// --- LOCAL STORAGE'A KAYDET VE YENİDEN GÖSTER ---
function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// --- TOAST BİLDİRİMİ GÖSTER (Bootstrap) ---
function showToast(message, type) {
  const toastContainer = document.createElement("div");
  toastContainer.className = `toast align-items-center text-bg-${type} border-0`;
  toastContainer.setAttribute("role", "alert");
  toastContainer.setAttribute("aria-live", "assertive");
  toastContainer.setAttribute("aria-atomic", "true");

  toastContainer.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  const toastArea = document.createElement("div");
  toastArea.className = "position-fixed top-0 end-0 p-3";
  toastArea.style.zIndex = "1080";
  toastArea.appendChild(toastContainer);
  document.body.appendChild(toastArea);

  const toast = new bootstrap.Toast(toastContainer);
  toast.show();

  setTimeout(() => toastArea.remove(), 3000);
}

// --- EVENTLER ---
addBtn.addEventListener("click", addTodo);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

// --- BAŞLANGIÇTA LİSTEYİ YÜKLE ---
renderTodos();
