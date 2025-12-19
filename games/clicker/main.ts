let score = 0;
let highScore = 0;
let timeLeft = 10;
let gameActive = false;
let playerName = "Player";
let timerInterval: any = null;

// --- DOM ELEMENTS ---
const nameModal = document.getElementById("name-modal") as HTMLElement;
const playerNameInput = document.getElementById(
  "player-name"
) as HTMLInputElement;
const startGameBtn = document.getElementById("start-game") as HTMLButtonElement;
const clickBtn = document.getElementById("click-btn") as HTMLButtonElement;
const btnReady = document.getElementById("btn-ready") as HTMLButtonElement;
const timerDisplay = document.getElementById("timer-display") as HTMLElement;
const currentScoreEl = document.getElementById("current-score") as HTMLElement;
const highScoreEl = document.getElementById("high-score") as HTMLElement;
const chatArea = document.getElementById("chat-area") as HTMLElement;
const gameOverModal = document.getElementById("game-over-modal") as HTMLElement;
const finalScoreEl = document.getElementById("final-score") as HTMLElement;
const rankMessageEl = document.getElementById("rank-message") as HTMLElement;
const playAgainBtn = document.getElementById("play-again") as HTMLButtonElement;

// --- INITIALIZE ---
function init() {
  const savedName = localStorage.getItem("clicker_name");
  if (savedName) {
    playerName = savedName;
    nameModal.classList.add("hidden");
    loadHighScore();
    addLog(
      "System",
      `Selamat datang, ${playerName}. Klik tombol 'SIAP?' untuk mulai.`
    );
  }
}

function addLog(sender: string, message: string) {
  const logHTML = `
        <div class="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div class="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white uppercase">${sender.charAt(
              0
            )}</div>
            <div class="px-4 py-2 border bg-slate-800 rounded-2xl rounded-tl-none border-slate-700/50 max-w-[85%]">
                <p class="text-[9px] font-bold text-blue-400 uppercase mb-0.5">${sender}</p>
                <p class="text-xs text-slate-300 leading-relaxed">${message}</p>
            </div>
        </div>`;
  chatArea.insertAdjacentHTML("beforeend", logHTML);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function startCountdown() {
  if (gameActive) return;

  score = 0;
  timeLeft = 10;
  gameActive = true;

  currentScoreEl.textContent = "0";
  btnReady.classList.add("hidden");
  clickBtn.disabled = false;
  addLog("System", "Game Dimulai! Ayo klik secepat mungkin!");

  timerInterval = setInterval(() => {
    timeLeft -= 0.1;
    timerDisplay.textContent = timeLeft.toFixed(1) + "s";

    if (timeLeft <= 0) {
      endGame();
    }
  }, 100);
}

function endGame() {
  clearInterval(timerInterval);
  gameActive = false;
  clickBtn.disabled = true;
  timerDisplay.textContent = "0.0s";

  finalScoreEl.textContent = score.toString();

  // Menentukan Rank berdasarkan CPS
  const cps = score / 10;
  let rank = "";
  if (cps < 3) rank = "Siput Lambat 🐌";
  else if (cps < 6) rank = "Jari Kilat ⚡";
  else rank = "Dewa Clicker 👑";

  rankMessageEl.textContent = `Rank: ${rank} (${cps} CPS)`;

  if (score > highScore) {
    highScore = score;
    saveHighScore();
    addLog("System", `REKOR BARU! Kamu berhasil mengumpulkan ${score} klik.`);
  } else {
    addLog("System", `Waktu habis. Kamu mengumpulkan ${score} klik.`);
  }

  gameOverModal.classList.remove("hidden");
}

function loadHighScore() {
  const saved = localStorage.getItem(`clicker_high_${playerName}`);
  highScore = saved ? parseInt(saved) : 0;
  highScoreEl.textContent = highScore.toString();
}

function saveHighScore() {
  localStorage.setItem(`clicker_high_${playerName}`, highScore.toString());
  highScoreEl.textContent = highScore.toString();
}

// event listeners
startGameBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim();
  if (name) {
    localStorage.setItem("clicker_name", name);
    location.reload();
  }
});

btnReady.addEventListener("click", startCountdown);

clickBtn.addEventListener("click", () => {
  if (!gameActive) return;
  score++;
  currentScoreEl.textContent = score.toString();

  // Efek visual klik
  clickBtn.classList.add("click-pulse");
  setTimeout(() => clickBtn.classList.remove("click-pulse"), 300);
});

playAgainBtn.addEventListener("click", () => {
  gameOverModal.classList.add("hidden");
  btnReady.classList.remove("hidden");
  timerDisplay.textContent = "10.0s";
  score = 0;
  currentScoreEl.textContent = "0";
});

init();
export {};
