// main.ts
import * as dom from "./dom";
import * as logic from "./logic";

// --- INIT ---
function startGame() {
  logic.initGame();
  dom.resetChat();

  dom.addChatMessage(
    "Komputer",
    "Saya telah memilih angka antara 1–100. Tebak dalam 5 percobaan!"
  );

  dom.updateAttempts(logic.getAttempts());

  const highScore = logic.loadHighScore();
  if (highScore !== null) dom.updateHighScore(highScore);
}

// --- EVENTS ---
dom.numberGuessingStartGameBtn.addEventListener("click", () => {
  const name = dom.numberGuessingPlayerNameInput.value.trim();
  if (!name) return;

  localStorage.setItem("playerName", name);
  logic.setPlayerName(name);
  dom.numberGuessingNameModal.classList.add("hidden");

  startGame();
});

dom.numberGuessingSubmitGuess.addEventListener("click", () => {
  const guess = parseInt(dom.numberGuessingGuessInput.value);
  const player = logic.getPlayerName();

  if (player) {
    dom.addChatMessage(player, guess.toString(), "text-green-400");
  }

  const result = logic.makeGuess(guess);
  dom.updateAttempts(logic.getAttempts());

  switch (result.status) {
    case "invalid":
      dom.addChatMessage(
        "Komputer",
        "Masukkan angka antara 1–100!",
        "text-red-400"
      );
      break;

    case "correct":
      dom.addChatMessage(
        "Komputer",
        "Selamat! Tebakan kamu benar!",
        "text-green-400"
      );
      dom.addChatMessage("Komputer", `Skor kamu: ${result.score}`);
      logic.saveScore();
      dom.showGameOver("Selamat!", "Kamu menang!");
      break;

    case "gameover":
      dom.addChatMessage(
        "Komputer",
        `Game over! Angka yang benar adalah ${result.targetNumber}.`,
        "text-red-400"
      );
      dom.showGameOver(
        "Game Over",
        `Angka yang benar adalah ${result.targetNumber}`
      );
      break;

    case "hint":
      if (result.hint) {
        dom.addChatMessage("Komputer", result.hint);
      }
      break;
  }

  dom.numberGuessingGuessInput.value = "";
});

dom.numberGuessingPlayAgainBtn.addEventListener("click", () => {
  dom.hideGameOver();
  startGame();
});

dom.numberGuessingBackToHomeBtn.addEventListener("click", () => {
  window.location.href = "/index.html";
});

// --- BOOT ---
window.addEventListener("load", () => {
  const savedName = localStorage.getItem("playerName");

  if (savedName) {
    logic.setPlayerName(savedName);
    startGame();
  } else {
    dom.numberGuessingNameModal.classList.remove("hidden");
  }
});

export {};
