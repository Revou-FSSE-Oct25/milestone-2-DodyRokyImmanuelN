import { clickerGameChatArea } from "../clicker/dom";

// --- DOM ELEMENTS ---
export const numberGuessingChatArea = document.getElementById(
  "chat-area"
) as HTMLElement;
export const numberGuessingGuessInput = document.getElementById(
  "guess-input"
) as HTMLInputElement;
export const numberGuessingSubmitGuess = document.getElementById(
  "submit-guess"
) as HTMLButtonElement;
export const numberGuessingGameAttempts = document.getElementById(
  "attempts"
) as HTMLElement;
export const numberGuessingScore = document.getElementById(
  "score"
) as HTMLElement;

export const numberGuessingNameModal = document.getElementById(
  "name-modal"
) as HTMLElement;
export const numberGuessingPlayerNameInput = document.getElementById(
  "player-name"
) as HTMLInputElement;
export const numberGuessingStartGameBtn = document.getElementById(
  "start-game"
) as HTMLButtonElement;

export const numberGuessingGameOverModal = document.getElementById(
  "game-over-modal"
) as HTMLElement;
export const numberGuessingGameOverTitle = document.getElementById(
  "game-over-title"
) as HTMLElement;
export const numberGuessingGameOverMessage = document.getElementById(
  "game-over-message"
) as HTMLElement;
export const numberGuessingPlayAgainBtn = document.getElementById(
  "play-again"
) as HTMLButtonElement;
export const numberGuessingBackToHomeBtn = document.getElementById(
  "back-to-home"
) as HTMLButtonElement;

export function resetChat() {
  clickerGameChatArea.innerHTML = "";
}

export function addChatMessage(
  sender: string,
  message: string,
  className = ""
) {
  const wrapper = document.createElement("div");
  wrapper.className = `mb-2 ${className}`;

  const senderEl = document.createElement("span");
  senderEl.className = "font-bold text-blue-400";
  senderEl.textContent = `${sender}: `;

  const messageEl = document.createElement("span");
  messageEl.className = "text-gray-300";
  messageEl.textContent = message;

  wrapper.append(senderEl, messageEl);
  clickerGameChatArea.appendChild(wrapper);

  clickerGameChatArea.scrollTop = clickerGameChatArea.scrollHeight;
}

export function updateAttempts(value: number) {
  numberGuessingGameAttempts.textContent = value.toString();
}

export function updateHighScore(value: number) {
  numberGuessingScore.textContent = `High Score: ${value}`;
}

export function showGameOver(title: string, message: string) {
  numberGuessingGameOverTitle.textContent = title;
  numberGuessingGameOverMessage.textContent = message;
  numberGuessingGameOverModal.classList.remove("hidden");
}

export function hideGameOver() {
  numberGuessingGameOverModal.classList.add("hidden");
}
