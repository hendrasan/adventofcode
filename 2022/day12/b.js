const path = require("path");
const fs = require("fs");
const { mapLettersToNumbers } = require("./utils");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split("\n");

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

let arr = [];
let queue = [];
let start;
let end;

input.forEach((line, i) => {
  line = line.trim();

  let lineArr = [];

  for (let j = 0; j < line.length; j++) {
    let char = line[j];
    if (char === "S") {
      start = [i, j];
      char = "a";
    }

    if (char === "E") {
      end = [i, j];
      char = "z";
    }

    if (char === "a") {
      queue.push({ pos: [i, j], steps: 0 });
    }

    lineArr.push(mapLettersToNumbers(char));
  }

  arr.push(lineArr);
});

// console.log(arr);

let moves = 0;

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

let seen = new Set();
while (queue.length) {
  const {
    pos: [i, j],
    steps,
  } = queue.shift();

  if (arrayEquals([i, j], end)) {
    moves = steps;
    break;
  }

  if (seen.has(`${i},${j}`)) {
    continue;
  }

  for (const [di, dj] of dirs) {
    if (
      i + di < 0 ||
      i + di >= arr.length ||
      j + dj < 0 ||
      j + dj >= arr[0].length ||
      arr[i + di][j + dj] > arr[i][j] + 1 ||
      seen.has(`${i + di},${j + dj}`)
    ) {
      continue;
    }

    queue.push({ pos: [i + di, j + dj], steps: steps + 1 });
  }

  seen.add(`${i},${j}`);
}

console.log(moves);
