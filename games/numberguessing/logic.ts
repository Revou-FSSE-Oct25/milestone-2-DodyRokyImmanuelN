// logic.ts

let targetNumber = 0;
let attempts = 0;
let score = 0;
let playerName: string | null = null;

// --- GAME STATE ---
export function initGame() {
  targetNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 5;
  score = 0;
}

export function setPlayerName(name: string) {
  playerName = name;
}

export function getPlayerName() {
  return playerName;
}

export function getAttempts() {
  return attempts;
}

export function makeGuess(guess: number) {
  if (isNaN(guess) || guess < 1 || guess > 100) {
    return { status: "invalid" };
  }

  attempts--;

  if (guess === targetNumber) {
    score = attempts;
    return { status: "correct", score };
  }

  if (attempts === 0) {
    return { status: "gameover", targetNumber };
  }

  return {
    status: "hint",
    hint: guess > targetNumber ? "Too high" : "Too low",
  };
}

// --- STORAGE ---
export function saveScore() {
  if (!playerName) return;

  const key = `highScore_${playerName}`;
  const highScore = localStorage.getItem(key);

  if (!highScore || score > parseInt(highScore)) {
    localStorage.setItem(key, score.toString());
  }
}

export function loadHighScore(): number | null {
  if (!playerName) return null;

  const value = localStorage.getItem(`highScore_${playerName}`);
  return value ? parseInt(value) : null;
}
