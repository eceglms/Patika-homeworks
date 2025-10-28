const rollBtn = document.getElementById("roll-btn");
const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const result = document.getElementById("result");

const diceImages = [
  "images/dice1.png",
  "images/dice2.png",
  "images/dice3.png",
  "images/dice4.png",
  "images/dice5.png",
  "images/dice6.png"
];

function rollDice() {
  let animationTime = 3000; // 3 saniye
  let interval = 100;
  let elapsed = 0;

  const rolling = setInterval(() => {
    let random1 = Math.floor(Math.random() * 6);
    let random2 = Math.floor(Math.random() * 6);
    dice1.src = diceImages[random1];
    dice2.src = diceImages[random2];
    elapsed += interval;

    if (elapsed >= animationTime) {
      clearInterval(rolling);

      let final1 = Math.floor(Math.random() * 6) + 1;
      let final2 = Math.floor(Math.random() * 6) + 1;
      dice1.src = `images/dice${final1}.png`;
      dice2.src = `images/dice${final2}.png`;

      setTimeout(() => {
        if (final1 > final2) {
          result.textContent = `${document.getElementById("player1-name").value} Wins! 🏆`;
        } else if (final2 > final1) {
          result.textContent = "Player 2 Wins! 💥";
        } else {
          result.textContent = "Draw! 🤝";
        }
      }, 200);
    }
  }, interval);
}

rollBtn.addEventListener("click", rollDice);
