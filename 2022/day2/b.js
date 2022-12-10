const { input } = require("./input");

// elf choices
// A = rock
// B = paper
// C = scissors

// your choice
// X = you need to lose
// Y = you need to draw
// Z = you need to win

// points
// rock = 1
// paper = 2
// scissors = 3
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

const yourInstructions = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

const choiceScores = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const rpsArray = ["rock", "paper", "scissors"];

input.forEach((round, i) => {
  const [elf, you] = round.trim().split(" ");

  const elfChoice = elfChoiceMap[elf];
  const yourInstruction = yourInstructions[you];

  let yourChoice;

  const elfIndex = rpsArray.indexOf(elfChoice);

  if (yourInstruction === "draw") {
    yourChoice = elfChoice;
  } else if (yourInstruction === "lose") {
    const previousIndex = (elfIndex - 1 + rpsArray.length) % rpsArray.length;
    yourChoice = rpsArray[previousIndex];
  } else if (yourInstruction === "win") {
    const nextIndex = (elfIndex + 1) % rpsArray.length;
    yourChoice = rpsArray[nextIndex];
  }

  const choiceScore = choiceScores[yourChoice];

  const resultScore = compare(elfChoice, yourChoice);

  const score = choiceScore + resultScore;

  scores += score;
});

console.log(scores);
