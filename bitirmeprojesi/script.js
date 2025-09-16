document.addEventListener("DOMContentLoaded", () => {
  
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('is-open'); // optional if you want "X" animation
  });


  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) toggleMenu();
  });

  const classSwitcherButtons = document.querySelectorAll(".classes-buttons a");
  const classImages = document.querySelectorAll(".class-img");
  const sections = document.querySelectorAll(".content-section");

  if (classSwitcherButtons.length) {
    const activate = (btn) => {
      classSwitcherButtons.forEach((b) => b.classList.remove("active"));
      sections.forEach((s) => (s.style.display = "none"));
      classImages.forEach((img) => img.classList.remove("active"));

      btn.classList.add("active");
      const key = btn.dataset.class;

      const targetImg = document.querySelector(`.class-img.${key}`);
      if (targetImg) targetImg.classList.add("active");

      const targetSection = document.getElementById(key);
      if (targetSection) targetSection.style.display = "flex";
    };

    classSwitcherButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        activate(btn);
      });
    });

    activate(classSwitcherButtons[0]);
  }
});

function calculateBMI() {
  const hVal = parseFloat(document.getElementById("height").value);
  const wVal = parseFloat(document.getElementById("weight").value);

  if (!isNaN(hVal) && hVal > 0 && !isNaN(wVal) && wVal > 0) {
    const h = hVal / 100; // cm -> m
    const bmi = wVal / (h * h);

    const indicator = document.getElementById("bmi-indicator");
    if (!indicator) return;

    // ok konumu
    let leftPct = 30;
    if (bmi < 18.5) leftPct = 15;
    else if (bmi < 25) leftPct = 30;
    else if (bmi < 30) leftPct = 50;
    else if (bmi < 35) leftPct = 65;
    else leftPct = 80;

    indicator.style.left = leftPct + "%";
    indicator.title = `BMI: ${bmi.toFixed(2)}`;
  }
}