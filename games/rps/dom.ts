import type { Choice, Result } from "./logic";

export const dom = {
  nameModal: document.getElementById("name-modal") as HTMLElement,
  playerNameInput: document.getElementById("player-name") as HTMLInputElement,
  startGameBtn: document.getElementById("start-game") as HTMLButtonElement,

  chatArea: document.getElementById("chat-area") as HTMLElement,
  choiceBtns: document.querySelectorAll<HTMLButtonElement>(".choice-btn"),

  playerVisual: document.getElementById("player-visual") as HTMLElement,
  computerVisual: document.getElementById("computer-visual") as HTMLElement,
  resultText: document.getElementById("result-text") as HTMLElement,

  careerScore: document.getElementById("score") as HTMLElement,
  matchRound: document.getElementById("match-round") as HTMLElement,

  gameOverModal: document.getElementById("game-over-modal") as HTMLElement,
  playAgainBtn: document.getElementById("play-again") as HTMLButtonElement,

  footerExitBtn: document.getElementById("footer-exit-btn"),
  modalHomeBtn: document.getElementById("modal-home-btn"),
};

const EMOJI: Record<Choice, string> = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️",
};

export function addLog(sender: string, message: string, isPlayer = false) {
  const wrap = document.createElement("div");
  wrap.className = `flex gap-3 ${
    isPlayer ? "flex-row-reverse" : ""
  } animate-in fade-in slide-in-from-bottom-2`;

  const text = document.createElement("p");
  text.className = "text-xs text-slate-300";
  text.textContent = `${sender}: ${message}`;

  wrap.appendChild(text);
  dom.chatArea.appendChild(wrap);
  dom.chatArea.scrollTop = dom.chatArea.scrollHeight;
}

export function updateStage(p: Choice, c: Choice) {
  dom.playerVisual.textContent = EMOJI[p];
  dom.computerVisual.textContent = EMOJI[c];
}

export function showResult(result: Result) {
  dom.resultText.style.opacity = "1";
  dom.resultText.textContent =
    result === "win" ? "YOU WIN!" : result === "lose" ? "YOU LOSE" : "DRAW";
}

export function updateLampu(player: number, computer: number) {
  for (let i = 1; i <= 2; i++) {
    const p = document.getElementById(`p-point-${i}`);
    const c = document.getElementById(`c-point-${i}`);

    if (p)
      p.className = `w-3 h-3 rounded-full ${
        player >= i ? "bg-blue-500 shadow-lg" : "bg-slate-700"
      }`;
    if (c)
      c.className = `w-3 h-3 rounded-full ${
        computer >= i ? "bg-red-500 shadow-lg" : "bg-slate-700"
      }`;
  }
}

export function updateCareer(score: number) {
  dom.careerScore.textContent = score.toString();
}
