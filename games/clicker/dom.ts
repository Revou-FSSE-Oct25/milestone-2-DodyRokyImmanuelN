// dom.ts

// --- ELEMENTS ---
export const clickerGameNameModal = document.getElementById("name-modal")!;
export const clickerGamePlayerNameInput = document.getElementById(
  "player-name"
) as HTMLInputElement;

export const clickerGameStartGameBtn = document.getElementById(
  "start-game"
) as HTMLButtonElement;

export const clickerGameClickBtn = document.getElementById(
  "click-btn"
) as HTMLButtonElement;
export const clickerGameBtnReady = document.getElementById(
  "btn-ready"
) as HTMLButtonElement;

export const clickerGameTimerDisplay =
  document.getElementById("timer-display")!;
export const clickerGameCurrentScore =
  document.getElementById("current-score")!;
export const clickerGameHighScore = document.getElementById("high-score")!;

export const clickerGameChatArea = document.getElementById("chat-area")!;

export const clickerGameOverModal = document.getElementById("game-over-modal")!;
export const clickerGameFinalScore = document.getElementById("final-score")!;
export const clickerGameRankMessage = document.getElementById("rank-message")!;
export const clickerGamePlayAgainBtn = document.getElementById(
  "play-again"
) as HTMLButtonElement;

// --- UI HELPERS ---
export function updateTimer(value: string) {
  clickerGameTimerDisplay.textContent = value;
}

export function updateScore(value: number) {
  clickerGameCurrentScore.textContent = value.toString();
}

export function updateHighScore(value: number) {
  clickerGameHighScore.textContent = value.toString();
}

// --- XSS-SAFE LOG ---
export function addLog(sender: string, message: string) {
  const wrapper = document.createElement("div");
  wrapper.className =
    "flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300";

  const avatar = document.createElement("div");
  avatar.className =
    "h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white";
  avatar.textContent = sender.charAt(0).toUpperCase();

  const bubble = document.createElement("div");
  bubble.className =
    "px-4 py-2 border bg-slate-800 rounded-2xl rounded-tl-none border-slate-700/50 max-w-[85%]";

  const senderEl = document.createElement("p");
  senderEl.className = "text-[9px] font-bold text-blue-400 uppercase";
  senderEl.textContent = sender;

  const messageEl = document.createElement("p");
  messageEl.className = "text-xs text-slate-300 leading-relaxed";
  messageEl.textContent = message;

  bubble.append(senderEl, messageEl);
  wrapper.append(avatar, bubble);
  clickerGameChatArea.appendChild(wrapper);

  clickerGameChatArea.scrollTop = clickerGameChatArea.scrollHeight;
}
