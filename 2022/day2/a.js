const { input } = require("./input");

// elf choices
// A = rock
// B = paper
// C = scissors

// points
// X = rock = 1
// Y = paper = 2
// Z = scissors = 3
// win = 6
// draw = 3
// lose = 0

let scores = 0;

function compare(elf, you) {
  if (elf === you) {
    return 3;
  }
  if (elf === "rock" && you === "paper") {
    return 6;
  }
  if (elf === "paper" && you === "scissors") {
    return 6;
  }
  if (elf === "scissors" && you === "rock") {
    return 6;
  }
  return 0;
}

const elfChoiceMap = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const yourChoiceMap = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

const choiceScores = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

input.forEach((round, i) => {
  const [elf, you] = round.trim().split(" ");

  const elfChoice = elfChoiceMap[elf];
  const yourChoice = yourChoiceMap[you];

  const choiceScore = choiceScores[yourChoice];

  const resultScore = compare(elfChoice, yourChoice);

  const score = choiceScore + resultScore;

  scores += score;
});

console.log(scores);
