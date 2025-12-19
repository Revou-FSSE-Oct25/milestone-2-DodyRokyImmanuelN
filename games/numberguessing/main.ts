// DOM Elements
const chatArea = document.getElementById("chat-area") as HTMLElement;
const guessInput = document.getElementById("guess-input") as HTMLInputElement;
const submitGuess = document.getElementById(
  "submit-guess"
) as HTMLButtonElement;
const attemptsEl = document.getElementById("attempts") as HTMLElement;
const scoreEl = document.getElementById("score") as HTMLElement;
const nameModal = document.getElementById("name-modal") as HTMLElement;
const playerNameInput = document.getElementById(
  "player-name"
) as HTMLInputElement;
const startGameBtn = document.getElementById("start-game") as HTMLButtonElement;
const gameOverModal = document.getElementById("game-over-modal") as HTMLElement;
const gameOverTitle = document.getElementById("game-over-title") as HTMLElement;
const gameOverMessage = document.getElementById(
  "game-over-message"
) as HTMLElement;
const playAgainBtn = document.getElementById("play-again") as HTMLButtonElement;
const backToHomeBtn = document.getElementById(
  "back-to-home"
) as HTMLButtonElement;

// Game Variables
let targetNumber: number;
let attempts: number;
let score: number;
let playerName: string | null;

// Inisialisasi Game
function initGame() {
  targetNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 5;
  score = 0;
  attemptsEl.textContent = attempts.toString();
  scoreEl.textContent = "";
  chatArea.innerHTML = `
    <div class="mb-2">
      <span class="font-bold text-blue-400">Komputer:</span>
      <span class="text-gray-300"> Saya telah memilih angka antara 1-100. Tebak dalam 5 percobaan!</span>
    </div>
  `;
}

// Tampilkan Modal Input Nama
function showNameModal() {
  nameModal.classList.remove("hidden");
}

function showGameOverModal(title: string, message: string) {
  gameOverTitle.textContent = title;
  gameOverMessage.textContent = message;
  gameOverModal.classList.remove("hidden");
}

// Simpan Nama Player
function savePlayerName() {
  playerName = playerNameInput.value.trim();
  if (playerName) {
    localStorage.setItem("playerName", playerName);
    nameModal.classList.add("hidden");
    initGame();
    loadScore();
  }
}

// Tambah Pesan ke Chat
function addChatMessage(
  sender: string,
  message: string,
  className: string = ""
) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `mb-2 ${className}`;
  messageDiv.innerHTML = `
    <span class="font-bold text-green-400">${sender}:</span>
  <span class="text-gray-300"> ${message}</span>
  `;
  chatArea.appendChild(messageDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
}

// Handle Tebakan
function handleGuess() {
  const guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess < 1 || guess > 100) {
    addChatMessage("Komputer", "Masukkan angka antara 1-100!", "text-red-400");
    return;
  }

  if (playerName) {
    addChatMessage(playerName, guess.toString(), "text-green-400");
  }
  attempts--;
  attemptsEl.textContent = attempts.toString();

  if (guess === targetNumber) {
    score = attempts;
    addChatMessage(
      "Komputer",
      "Selamat! Kamu berhasil menebak angka dengan benar!",
      "text-green-400"
    );
    addChatMessage("Komputer", `Skor kamu: ${score}`);
    saveScore();
    showGameOverModal("Selamat!", "Kamu berhasil menebak angka dengan benar!");
  } else if (attempts === 0) {
    addChatMessage(
      "Komputer",
      `Game over! Angka yang benar adalah ${targetNumber}.`,
      "text-red-400"
    );
    showGameOverModal("Game Over!", `Angka yang benar adalah ${targetNumber}.`);
  } else {
    const hint = guess > targetNumber ? "Too high" : "Too low";
    addChatMessage("Komputer", hint);
  }

  guessInput.value = "";
}

// Simpan Skor ke Local Storage
function saveScore() {
  if (playerName) {
    const highScore = localStorage.getItem(`highScore_${playerName}`);
    if (!highScore || score > parseInt(highScore)) {
      localStorage.setItem(`highScore_${playerName}`, score.toString());
    }
  }
}

// Muat Skor dari Local Storage
function loadScore() {
  if (playerName) {
    const highScore = localStorage.getItem(`highScore_${playerName}`);
    if (highScore) {
      scoreEl.textContent = `High Score: ${highScore}`;
    }
  }
}

// Event Listeners
startGameBtn.addEventListener("click", savePlayerName);
submitGuess.addEventListener("click", handleGuess);
playAgainBtn.addEventListener("click", () => {
  gameOverModal.classList.add("hidden");
  initGame();
  loadScore();
});

backToHomeBtn.addEventListener("click", () => {
  window.location.href = "/index.html";
});

// Cek Nama Player saat Load
window.addEventListener("load", () => {
  playerName = localStorage.getItem("playerName");
  if (playerName) {
    initGame();
    loadScore();
  } else {
    showNameModal();
  }
});

export {};
