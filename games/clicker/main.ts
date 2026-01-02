// main.ts
import * as dom from "./dom";
import * as logic from "./logic";

// --- INIT ---
function init() {
  const savedName = localStorage.getItem("clicker_name");
  if (!savedName) return;

  logic.setPlayerName(savedName);
  dom.clickerGameNameModal.classList.add("hidden");

  const high = logic.loadHighScore();
  dom.updateHighScore(high);

  dom.addLog(
    "System",
    `Selamat datang, ${logic.playerName}. Klik 'SIAP?' untuk mulai.`
  );
}

// --- GAME FLOW ---
function startCountdown() {
  if (logic.gameActive) return;

  logic.resetGame();
  dom.updateScore(0);
  dom.updateTimer("10.0s");

  dom.clickerGameBtnReady.classList.add("hidden");
  dom.clickerGameClickBtn.disabled = false;

  dom.addLog("System", "Game dimulai! Ayo klik secepat mungkin!");

  logic.startTimer((time) => {
    dom.updateTimer(time.toFixed(1) + "s");
  }, endGame);
}

function endGame() {
  if (logic.timerInterval) clearInterval(logic.timerInterval);

  logic.stopGame();
  dom.clickerGameClickBtn.disabled = true;
  dom.updateTimer("0.0s");

  dom.clickerGameFinalScore.textContent = logic.score.toString();

  const { rank, cps } = logic.calculateRank();
  dom.clickerGameRankMessage.textContent = `Rank: ${rank} (${cps.toFixed(
    1
  )} CPS)`;

  if (logic.score > logic.highScore) {
    logic.setHighScore(logic.score);
    logic.saveHighScore();
    dom.updateHighScore(logic.highScore);
    dom.addLog("System", `REKOR BARU! ${logic.score} klik.`);
  } else {
    dom.addLog("System", `Waktu habis. Total ${logic.score} klik.`);
  }

  dom.clickerGameOverModal.classList.remove("hidden");
}

// --- EVENTS ---
dom.clickerGameStartGameBtn.addEventListener("click", () => {
  const name = dom.clickerGamePlayerNameInput.value.trim();
  if (!name) return;

  localStorage.setItem("clicker_name", name);
  location.reload();
});

dom.clickerGameBtnReady.addEventListener("click", startCountdown);

dom.clickerGameClickBtn.addEventListener("click", () => {
  if (!logic.gameActive) return;

  logic.incrementScore();
  dom.updateScore(logic.score);

  dom.clickerGameClickBtn.classList.add("click-pulse");
  setTimeout(
    () => dom.clickerGameClickBtn.classList.remove("click-pulse"),
    300
  );
});

dom.clickerGamePlayAgainBtn.addEventListener("click", () => {
  dom.clickerGameOverModal.classList.add("hidden");
  dom.clickerGameBtnReady.classList.remove("hidden");
  dom.updateTimer("10.0s");
  dom.updateScore(0);
});

// --- BOOT ---
init();
export {};
