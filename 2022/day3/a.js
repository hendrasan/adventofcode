const path = require("path");
const fs = require("fs");
const { mapLettersToNumbers } = require("./utils");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split("\n");

const results = [];

input.forEach((line, i) => {
  let rucksack = line.trim();

  const left = rucksack.substring(0, rucksack.length / 2);
  const right = rucksack.substring(rucksack.length / 2, rucksack.length);

  const leftMap = new Set();
  for (const char of left) {
    if (!leftMap.has(char)) {
      leftMap.add(char, true);
    }
  }

  const rightMap = new Set();
  for (const char of right) {
    if (!rightMap.has(char)) {
      rightMap.add(char, true);
    }
  }

  for (const char of rightMap) {
    if (leftMap.has(char)) {
      results.push(char);
    }
  }
});

const total = results.reduce((acc, curr) => {
  return acc + mapLettersToNumbers(curr);
}, 0);

console.log(total);
