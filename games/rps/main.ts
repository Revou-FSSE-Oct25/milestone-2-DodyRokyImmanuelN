const GAME_DATA = {
  choices: ["rock", "paper", "scissors"],
  emojis: {
    rock: "✊",
    paper: "✋",
    scissors: "✌️",
  },
  rules: {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  },
};

// --- DOM ELEMENTS ---
const nameModal = document.getElementById("name-modal") as HTMLElement;
const playerNameInput = document.getElementById(
  "player-name"
) as HTMLInputElement;
const startGameBtn = document.getElementById("start-game") as HTMLButtonElement;
const chatArea = document.getElementById("chat-area") as HTMLElement;
const choiceBtns = document.querySelectorAll(".choice-btn");
const playerVisual = document.getElementById("player-visual") as HTMLElement;
const computerVisual = document.getElementById(
  "computer-visual"
) as HTMLElement;
const resultText = document.getElementById("result-text") as HTMLElement;
const careerScoreEl = document.getElementById("score") as HTMLElement;
const matchRoundEl = document.getElementById("match-round") as HTMLElement;
const gameOverModal = document.getElementById("game-over-modal") as HTMLElement;
const playAgainBtn = document.getElementById("play-again") as HTMLButtonElement;
const footerExitBtn = document.getElementById(
  "footer-exit-btn"
) as HTMLButtonElement;
const modalHomeBtn = document.getElementById(
  "modal-home-btn"
) as HTMLButtonElement;

// --- STATE ---
let playerName: string = "Player";
let playerPoints: number = 0;
let computerPoints: number = 0;
let careerWins: number = 0;
let currentRound: number = 1;

function init() {
  const savedName = localStorage.getItem("rps_player_name");
  if (savedName) {
    playerName = savedName;
    nameModal.classList.add("hidden");
    loadCareerScore();
    addLog("System", `Arena siap! Target: 2 Poin untuk menang.`);
  }
}

function addLog(
  sender: string,
  message: string,
  type: "system" | "player" = "system"
) {
  const isSystem = type === "system";
  const avatar = isSystem ? "S" : playerName.charAt(0).toUpperCase();
  const avatarGradient = isSystem
    ? "from-blue-500 to-indigo-600"
    : "from-emerald-500 to-teal-600";
  const bubbleStyle = isSystem
    ? "bg-slate-800 rounded-2xl rounded-tl-none border-slate-700/50"
    : "bg-blue-600/20 rounded-2xl rounded-tr-none border-blue-500/20 ml-auto";
  const flexDir = isSystem ? "" : "flex-row-reverse";

  const logHTML = `
        <div class="flex items-start gap-3 ${flexDir} animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div class="h-8 w-8 rounded-xl bg-gradient-to-br ${avatarGradient} flex-shrink-0 flex items-center justify-center text-[10px] font-bold shadow-lg shadow-black/20 text-white">
                ${avatar}
            </div>
            <div class="px-4 py-2 border ${bubbleStyle} max-w-[80%]">
                <p class="text-[9px] font-bold ${
                  isSystem ? "text-blue-400" : "text-emerald-400"
                } uppercase mb-0.5">${sender}</p>
                <p class="text-xs leading-relaxed text-slate-300">${message}</p>
            </div>
        </div>
    `;

  chatArea.insertAdjacentHTML("beforeend", logHTML);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function backToHome(): void {
  window.location.href = "/index.html";
}

function playRound(playerChoice: string) {
  if (playerPoints >= 2 || computerPoints >= 2) return;

  const randomIndex = Math.floor(Math.random() * 3);
  const computerChoice = GAME_DATA.choices[randomIndex];

  // Visual Update
  updateStage(playerChoice, computerChoice);

  // Determiner
  if (playerChoice === computerChoice) {
    processResult("draw", playerChoice, computerChoice);
  } else {
    // Menggunakan Switch sesuai kriteria
    switch (playerChoice) {
      case "rock":
        computerChoice === "scissors"
          ? processResult("win", "Batu", "Gunting")
          : processResult("lose", "Batu", "Kertas");
        break;
      case "paper":
        computerChoice === "rock"
          ? processResult("win", "Kertas", "Batu")
          : processResult("lose", "Kertas", "Gunting");
        break;
      case "scissors":
        computerChoice === "paper"
          ? processResult("win", "Gunting", "Kertas")
          : processResult("lose", "Gunting", "Batu");
        break;
    }
  }
}

function processResult(
  res: "win" | "lose" | "draw",
  pTxt: string,
  cTxt: string
) {
  resultText.style.opacity = "1";

  if (res === "win") {
    playerPoints++;
    resultText.textContent = "YOU WIN!";
    resultText.className = "text-xl font-black text-emerald-400 italic";
    addLog(playerName, `Aku menggunakan ${pTxt} dan menang!`, "player");
  } else if (res === "lose") {
    computerPoints++;
    resultText.textContent = "YOU LOSE";
    resultText.className = "text-xl font-black text-red-500 italic";
    addLog("System", `Komputer menggunakan ${cTxt} dan mengalahkanmu.`);
  } else {
    resultText.textContent = "DRAW";
    resultText.className = "text-xl font-black text-slate-400 italic";
    addLog("System", `Hasil seri! Keduanya memilih ${pTxt}.`);
  }

  updatePointsVisual();
  checkEndMatch();
}

function updateStage(p: string, c: string) {
  // @ts-ignore
  playerVisual.textContent = GAME_DATA.emojis[p];
  // @ts-ignore
  computerVisual.textContent = GAME_DATA.emojis[c];
}

function updatePointsVisual() {
  for (let i = 1; i <= 2; i++) {
    const pDot = document.getElementById(`p-point-${i}`);
    const cDot = document.getElementById(`c-point-${i}`);
    if (pDot)
      pDot.className = `w-3 h-3 rounded-full transition-all duration-500 ${
        playerPoints >= i
          ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          : "bg-slate-700"
      }`;
    if (cDot)
      cDot.className = `w-3 h-3 rounded-full transition-all duration-500 ${
        computerPoints >= i
          ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
          : "bg-slate-700"
      }`;
  }
}

function checkEndMatch() {
  if (playerPoints === 2 || computerPoints === 2) {
    const isVictory = playerPoints === 2;
    if (isVictory) {
      careerWins++;
      saveCareerScore();
    }

    setTimeout(() => {
      const title = document.getElementById("game-over-title")!;
      const msg = document.getElementById("game-over-message")!;
      const icon = document.getElementById("final-emoji")!;

      title.textContent = isVictory ? "VICTORY!" : "DEFEAT";
      title.className = `text-3xl font-black mb-2 italic uppercase ${
        isVictory ? "text-blue-500" : "text-red-500"
      }`;
      msg.textContent = isVictory
        ? "Kamu berhasil mendominasi arena!"
        : "Komputer memenangkan duel kali ini.";
      icon.textContent = isVictory ? "🏆" : "💀";

      gameOverModal.classList.remove("hidden");
    }, 800);
  }
}

// local storage
function saveCareerScore() {
  localStorage.setItem(`rps_career_${playerName}`, careerWins.toString());
  careerScoreEl.textContent = careerWins.toString();
}

function loadCareerScore() {
  const saved = localStorage.getItem(`rps_career_${playerName}`);
  careerWins = saved ? parseInt(saved) : 0;
  careerScoreEl.textContent = careerWins.toString();
}

// event listeners
startGameBtn.addEventListener("click", () => {
  const val = playerNameInput.value.trim();
  if (val) {
    localStorage.setItem("rps_player_name", val);
    location.reload();
  }
});

if (footerExitBtn) {
  footerExitBtn.addEventListener("click", backToHome);
}

if (modalHomeBtn) {
  modalHomeBtn.addEventListener("click", backToHome);
}

choiceBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const choice = btn.getAttribute("data-choice");
    if (choice) playRound(choice);
  });
});

playAgainBtn.addEventListener("click", () => {
  playerPoints = 0;
  computerPoints = 0;
  currentRound++;
  matchRoundEl.textContent = currentRound.toString();

  playerVisual.textContent = "❓";
  computerVisual.textContent = "❓";
  resultText.style.opacity = "0";

  updatePointsVisual();
  gameOverModal.classList.add("hidden");
  addLog("System", `Ronde ${currentRound} dimulai!`);
});

init();

export {};
