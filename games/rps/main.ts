import * as logic from "./logic";
import {
  dom,
  addLog,
  updateStage,
  updateLampu,
  showResult,
  updateCareer,
} from "./dom";

function init() {
  const saved = localStorage.getItem("rps_player_name");
  if (!saved) return;

  logic.setPlayerName(saved);
  logic.loadCareer();
  dom.nameModal.classList.add("hidden");

  updateCareer(logic.getState().careerWins);
  addLog("System", "Arena siap! Target 2 poin.");
}

dom.startGameBtn.addEventListener("click", () => {
  const name = dom.playerNameInput.value.trim();
  if (!name) return;

  localStorage.setItem("rps_player_name", name);
  location.reload();
});

dom.choiceBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (logic.isFinished()) return;

    const choice = btn.dataset.choice as "rock" | "paper" | "scissors";

    const { result, computerChoice } = logic.play(choice);
    updateStage(choice, computerChoice);
    showResult(result);

    const state = logic.getState();
    updateLampu(state.playerPoints, state.computerPoints);

    if (result === "win") addLog(logic.getPlayerName(), "Aku menang!", true);
    else if (result === "lose") addLog("System", "Komputer menang.");
    else addLog("System", "Seri.");

    if (logic.isFinished()) {
      if (logic.isPlayerWinner()) {
        logic.saveCareer();
        updateCareer(logic.getState().careerWins);
      }
      dom.gameOverModal.classList.remove("hidden");
    }
  });
});

dom.playAgainBtn.addEventListener("click", () => {
  logic.resetMatch();
  dom.matchRound.textContent = logic.getState().round.toString();

  dom.playerVisual.textContent = "❓";
  dom.computerVisual.textContent = "❓";
  dom.resultText.style.opacity = "0";

  updateLampu(0, 0);
  dom.gameOverModal.classList.add("hidden");

  addLog("System", `Ronde ${logic.getState().round} dimulai!`);
});

function backToHome() {
  window.location.href = "/index.html";
}

init();

if (dom.footerExitBtn) {
  dom.footerExitBtn.addEventListener("click", backToHome);
}

if (dom.modalHomeBtn) {
  dom.modalHomeBtn.addEventListener("click", backToHome);
}

export {};
