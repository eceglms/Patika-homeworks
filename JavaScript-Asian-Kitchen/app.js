// ---- DATA ----
const menu = [
  { id: 1, title: "Tteokbokki", category: "Korea", price: 10.99,
    img: "https://raw.githubusercontent.com/ozanerturk/Asian-Kitchen-s-Menu/main/img/tteokbokki.jpg",
    desc: "Spicy rice cakes, serving with fish cake." },
  { id: 2, title: "Jajangmyeon", category: "Korea", price: 15.99,
    img: "https://raw.githubusercontent.com/ozanerturk/Asian-Kitchen-s-Menu/main/img/jajangmyeon.jpg",
    desc: "Black bean sauce noodle, serving with green onion." },
  { id: 3, title: "Bibimbap", category: "Korea", price: 8.99,
    img: "https://raw.githubusercontent.com/ozanerturk/Asian-Kitchen-s-Menu/main/img/bibimbap.jpg",
    desc: "Boiling vegetables, serving with special hot sauce." },
  { id: 4, title: "Dan Dan Noodle", category: "China", price: 5.99,
    img: "https://raw.githubusercontent.com/ozanerturk/Asian-Kitchen-s-Menu/main/img/dandan-noodle.jpg",
    desc: "Served with green onion and chili oil." },
  { id: 5, title: "Yangzhou Fried Rice", category: "China", price: 12.99,
    img: "https://raw.githubusercontent.com/ozanerturk/Asian-Kitchen-s-Menu/main/img/yangzhou-fried-rice.jpg",
    desc: "Classic fried rice with shrimp & veggies." },
  { id: 6, title: "Sushi", category: "Japan", price: 12.99,
    img: "https://raw.githubusercontent.com/ozanerturk/Asian-Kitchen-s-Menu/main/img/sushi.jpg",
    desc: "Fresh nigiri & maki selection." },
  { id: 7, title: "Onigiri", category: "Japan", price: 9.99,
    img: "https://raw.githubusercontent.com/ozanerturk/Asian-Kitchen-s-Menu/main/img/onigiri.jpg",
    desc: "Rice sandwich wrapped in seaweed." },
  { id: 8, title: "Ramen", category: "Japan", price: 14.99,
    img: "https://raw.githubusercontent.com/ozanerturk/Asian-Kitchen-s-Menu/main/img/ramen.jpg",
    desc: "Noodle soup with pork & egg." }
];

// ---- DOM ----
const sectionCenter = document.querySelector(".section-center");
const btnContainer  = document.querySelector(".btn-container");

// ---- INIT ----
window.addEventListener("DOMContentLoaded", () => {
  renderButtons();
  renderMenuItems(menu);
});

// ---- Buttons ----
function renderButtons() {
  const categories = menu.reduce((acc, itm) => {
    if (!acc.includes(itm.category)) acc.push(itm.category);
    return acc;
  }, ["All"]);

  btnContainer.innerHTML = categories.map(c =>
    `<button class="btn btn-outline-dark mx-1 my-1" data-category="${c}">${c}</button>`
  ).join("");

  btnContainer.querySelectorAll("button").forEach(b => {
    b.addEventListener("click", e => {
      const cat = e.currentTarget.dataset.category;
      const list = (cat === "All") ? menu : menu.filter(m => m.category === cat);
      renderMenuItems(list);
    });
  });
}

// ---- Cards ----
function renderMenuItems(list) {
  sectionCenter.innerHTML = list.map(item => `
    <article class="menu-items col-12 col-md-6 d-flex">
      <img class="photo" src="${item.img}" alt="${item.title}" />
      <div class="menu-info">
        <header class="menu-title">
          <h4>${item.title}</h4>
          <h4 class="price">${item.price.toFixed(2)}</h4>
        </header>
        <p class="menu-text">${item.desc}</p>
      </div>
    </article>
  `).join("");
}
