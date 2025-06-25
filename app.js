console.log("JS file is loaded");

let gameSeq = [];
let userSeq = [];
let highScore = localStorage.getItem("simonHighScore") || 0;
document.getElementById("high-score").innerText = `High Score: ${highScore}`;

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let strictMode = false;

let h2 = document.querySelector("h2");

// Function to play sound
function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

// Game starts on any keypress
document.addEventListener("keydown", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

// Button flash for game sequence
function gameFlash(btn) {
  btn.classList.add("flash");
  playSound("buttonclick");
  setTimeout(() => btn.classList.remove("flash"), 200);
}

// User click visual feedback
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 200);
}

// Move to next level
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomIndex = Math.floor(Math.random() * 4);
  let randColor = btns[randomIndex];
  let randBtn = document.getElementById(randColor);

  gameSeq.push(randColor);
  gameFlash(randBtn);
}

// Check user's answer
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    playSound("wrong");

    // Update high score
    if (level > highScore) {
      highScore = level;
      localStorage.setItem("simonHighScore", highScore);
      document.getElementById("high-score").innerText = `High Score: ${highScore}`;
    }

    h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br>Press any key to restart`;
    document.body.classList.add("game-over");

    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);

    if (strictMode) {
      reset();
    } else {
      started = false;
      userSeq = [];
    }
  }
}

// When user clicks a button
function btnPress() {
  let btn = this;
  let userColor = btn.id;
  userSeq.push(userColor);

  userFlash(btn);
  playSound("buttonclick");

  checkAns(userSeq.length - 1);
}

// Add click listeners to all buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", btnPress);
});

// Reset game
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

// Toggle strict mode
document.getElementById("strict-toggle").addEventListener("change", function () {
  strictMode = this.checked;
});

// Toggle dark mode
document.getElementById("dark-toggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});
