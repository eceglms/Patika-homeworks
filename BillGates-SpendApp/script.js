// ----- Config -----
const START_BALANCE = 100_000_000_000; // $100B

const PRODUCTS = [
  { id: "skyscraper", name: "Skyscraper", price: 850_000_000, img: "https://picsum.photos/seed/sky/600/400" },
  { id: "cruise",     name: "Cruise Ship", price: 930_000_000, img: "https://picsum.photos/seed/cruise/600/400" },
  { id: "nba",        name: "NBA Team", price: 2_120_000_000, img: "https://picsum.photos/seed/nba/600/400" },
  { id: "island",     name: "Private Island", price: 38_000_000, img: "https://picsum.photos/seed/island/600/400" },
  { id: "jet",        name: "Gulfstream Jet", price: 65_000_000, img: "https://picsum.photos/seed/jet/600/400" },
  { id: "house",      name: "LA Mega House", price: 42_000_000, img: "https://picsum.photos/seed/house/600/400" },
  { id: "yacht",      name: "Superyacht", price: 300_000_000, img: "https://picsum.photos/seed/yacht/600/400" },
  { id: "art",        name: "Rare Art", price: 12_000_000, img: "https://picsum.photos/seed/art/600/400" },
  { id: "car",        name: "Hypercar", price: 2_600_000, img: "https://picsum.photos/seed/car/600/400" },
  { id: "bigmac",     name: "Big Mac", price: 2, img: "https://picsum.photos/seed/burger/600/400" }
];

// ----- State -----
let balance = START_BALANCE;
const basket = new Map(PRODUCTS.map(p => [p.id, 0]));

// ----- DOM -----
const balanceEl = document.getElementById("balance");
const productsEl = document.getElementById("products");
const receiptListEl = document.getElementById("receipt-list");
const receiptTotalEl = document.getElementById("receipt-total");

// ----- Utils -----
const fmt = n =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function setBalance(val) {
  balance = val;
  balanceEl.textContent = fmt(balance);
}

function renderProducts() {
  const frag = document.createDocumentFragment();
  PRODUCTS.forEach(p => {
    const qty = basket.get(p.id);
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = p.id;
    card.innerHTML = `
      <img class="media" src="${p.img}" alt="${p.name}" loading="lazy"/>
      <div class="content">
        <div class="title">${p.name}</div>
        <div class="price">${fmt(p.price)}</div>
      </div>
      <div class="controls">
        <button class="btn-sell" data-action="sell">Sell</button>
        <input class="qty" type="number" min="0" step="1" value="${qty}" />
        <button class="btn-buy" data-action="buy">Buy</button>
      </div>
    `;
    frag.appendChild(card);
  });
  productsEl.innerHTML = "";
  productsEl.appendChild(frag);
  refreshControlsDisabled();
}

function refreshControlsDisabled() {
  // disable/enable buy/sell per product
  productsEl.querySelectorAll(".card").forEach(card => {
    const id = card.dataset.id;
    const p = PRODUCTS.find(x => x.id === id);
    const qty = basket.get(id);
    const btnSell = card.querySelector('[data-action="sell"]');
    const btnBuy = card.querySelector('[data-action="buy"]');
    const input = card.querySelector(".qty");

    btnSell.disabled = qty === 0;
    btnBuy.disabled = p.price > balance;
    input.value = qty;
  });
}

function renderReceipt() {
  const items = PRODUCTS
    .map(p => ({ ...p, qty: basket.get(p.id) }))
    .filter(x => x.qty > 0);

  receiptListEl.innerHTML = "";
  let total = 0;

  items.forEach(item => {
    const li = document.createElement("li");
    li.className = "receipt-item";
    const amount = item.qty * item.price;
    total += amount;

    li.innerHTML = `
      <span class="name">${item.name}</span>
      <span class="x">x${item.qty}</span>
      <span class="amount">${fmt(amount)}</span>
    `;
    receiptListEl.appendChild(li);
  });

  receiptTotalEl.textContent = fmt(total);
}

function tryBuy(id, count = 1) {
  const p = PRODUCTS.find(x => x.id === id);
  const cost = p.price * count;
  if (cost <= balance) {
    basket.set(id, basket.get(id) + count);
    setBalance(balance - cost);
    return true;
  }
  return false;
}

function trySell(id, count = 1) {
  const have = basket.get(id);
  const p = PRODUCTS.find(x => x.id === id);
  const sellCount = Math.min(count, have);
  if (sellCount > 0) {
    basket.set(id, have - sellCount);
    setBalance(balance + p.price * sellCount);
    return true;
  }
  return false;
}

// ----- Events -----
productsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const card = e.target.closest(".card");
  const id = card.dataset.id;

  if (btn.dataset.action === "buy") {
    tryBuy(id, 1);
  } else if (btn.dataset.action === "sell") {
    trySell(id, 1);
  }

  refreshControlsDisabled();
  renderReceipt();
});

productsEl.addEventListener("change", (e) => {
  const input = e.target.closest(".qty");
  if (!input) return;

  const card = e.target.closest(".card");
  const id = card.dataset.id;
  const desired = Math.max(0, Math.floor(Number(input.value) || 0));
  const current = basket.get(id);

  if (desired === current) return;

  if (desired > current) {
    // try to buy the difference, clamp by balance
    const diff = desired - current;
    const p = PRODUCTS.find(x => x.id === id);
    const maxCanBuy = Math.floor(balance / p.price);
    const willBuy = Math.min(diff, maxCanBuy);
    if (willBuy > 0) tryBuy(id, willBuy);
  } else {
    // sell the difference
    trySell(id, current - desired);
  }

  refreshControlsDisabled();
  renderReceipt();
});

// ----- Init -----
setBalance(START_BALANCE);
renderProducts();
renderReceipt();
