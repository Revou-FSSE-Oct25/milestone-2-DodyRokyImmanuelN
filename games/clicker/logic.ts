export let score = 0;
export let highScore = 0;
export let timeLeft = 10;
export let gameActive = false;
export let playerName = "Player";
export let timerInterval: number | null = null;

// --- STATE ---
export function setPlayerName(name: string) {
  playerName = name;
}

export function resetGame() {
  score = 0;
  timeLeft = 10;
  gameActive = true;
}

export function stopGame() {
  gameActive = false;
}

export function incrementScore() {
  score++;
}

export function setHighScore(value: number) {
  highScore = value;
}

// --- STORAGE ---
export function loadHighScore() {
  const saved = localStorage.getItem(`clicker_high_${playerName}`);
  highScore = saved ? parseInt(saved) : 0;
  return highScore;
}

export function saveHighScore() {
  localStorage.setItem(`clicker_high_${playerName}`, highScore.toString());
}

// --- RANK ---
export function calculateRank() {
  const cps = score / 10;

  if (cps < 3) return { rank: "Siput Lambat 🐌", cps };
  if (cps < 6) return { rank: "Jari Kilat ⚡", cps };

  return { rank: "Dewa Clicker 👑", cps };
}

// --- Timer ---

export function startTimer(
  onTick: (timeLeft: number) => void,
  onEnd: () => void
) {
  timerInterval = window.setInterval(() => {
    timeLeft -= 0.1;
    onTick(timeLeft);

    if (timeLeft <= 0) {
      stopTimer();
      onEnd();
    }
  }, 100);
}

export function stopTimer() {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}
