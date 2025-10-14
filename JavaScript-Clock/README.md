# 🕒 JavaScript Saat ve Karşılama

Bu proje, **Kodluyoruz Frontend Web Development Patikası** kapsamındaki **JavaScript 1. Ödevi**dir.  
Kullanıcıdan isim alarak ekranda kişisel bir karşılama mesajı, anlık saat ve gün bilgisi gösterir.

---

## 🎯 Amaç
- JavaScript'te **`Date`** nesnesi kullanarak dinamik saat ve gün bilgisini göstermek  
- Kullanıcıdan **`prompt()`** ile veri almak  
- DOM manipülasyonu ile HTML içeriğini dinamik olarak değiştirmek  
- `setInterval()` fonksiyonu ile her saniye saati güncellemek  

---

## 🧱 Kullanılan Teknolojiler
- **HTML5**  
- **CSS3**  
- **JavaScript (Vanilla JS)**  

---

## 💻 Ekran Görüntüsü

> Sayfa açıldığında kullanıcıdan isim istenir ⬇️  
<img src="https://user-images.githubusercontent.com/placeholder/prompt-screen.png" width="600">

> Ardından selamlama ve canlı saat görünür ⬇️  
<img src="https://user-images.githubusercontent.com/placeholder/clock-screen.png" width="600">

---

## ⚙️ Nasıl Çalışır?

1. Sayfa açıldığında kullanıcıdan isim istenir:
   ```javascript
   let userName = prompt("Adınız nedir?");
