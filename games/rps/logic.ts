export type Choice = "rock" | "paper" | "scissors";
export type Result = "win" | "lose" | "draw";

const GAME_DATA = {
  choices: ["rock", "paper", "scissors"] as Choice[],
  rules: {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  } as Record<Choice, Choice>,
};

let playerName = "Player";
let playerPoints = 0;
let computerPoints = 0;
let careerWins = 0;
let round = 1;

export function setPlayerName(name: string) {
  playerName = name;
}

export function getPlayerName() {
  return playerName;
}

export function getState() {
  return { playerPoints, computerPoints, careerWins, round };
}

export function resetMatch() {
  playerPoints = 0;
  computerPoints = 0;
  round++;
}

export function play(playerChoice: Choice) {
  const computerChoice = GAME_DATA.choices[Math.floor(Math.random() * 3)];

  if (playerChoice === computerChoice) {
    return { result: "draw" as Result, computerChoice };
  }

  if (GAME_DATA.rules[playerChoice] === computerChoice) {
    playerPoints++;
    return { result: "win" as Result, computerChoice };
  }

  computerPoints++;
  return { result: "lose" as Result, computerChoice };
}

export function isFinished() {
  return playerPoints === 2 || computerPoints === 2;
}

export function isPlayerWinner() {
  return playerPoints === 2;
}

// localStorage
export function loadCareer() {
  const saved = localStorage.getItem(`rps_career_${playerName}`);
  careerWins = saved ? parseInt(saved) : 0;
}

export function saveCareer() {
  careerWins++;
  localStorage.setItem(`rps_career_${playerName}`, careerWins.toString());
}
