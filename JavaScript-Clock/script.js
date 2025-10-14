// Kullanıcıdan ad alınır
let userName = prompt("Adınız nedir?");
let greeting = document.getElementById("greeting");
let clock = document.getElementById("clock");
let info = document.getElementById("info");

// İsmi yazdır
greeting.innerHTML = `Merhaba, <strong>${userName || "Ziyaretçi"}</strong>! Hoş geldin!`;

// Saat ve gün bilgisini gösterecek fonksiyon
function showTime() {
  const now = new Date();

  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let seconds = now.getSeconds().toString().padStart(2, "0");

  const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  let day = days[now.getDay()];

  clock.innerHTML = `${hours}:${minutes}:${seconds} ${day}`;
}

// Her saniye yenile
setInterval(showTime, 1000);
showTime();

// Alt bilgi
info.innerHTML = `tarihinde <strong>Kodluyoruz Frontend Web Development Patikası</strong>'nın Javascript bölümü 1. Ödevindesiniz.`;
