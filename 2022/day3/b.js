const path = require("path");
const fs = require("fs");
const { mapLettersToNumbers } = require("./utils");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split("\n");

let groups = [];
for (let i = 0; i < input.length; i += 3) {
  groups.push(input.slice(i, i + 3));
}

const results = [];

groups.forEach((elf, i) => {
  const arrayOfSets = [];

  elf.forEach((line, i) => {
    let rucksack = line.trim();

    const elfSet = new Set();
    for (const char of rucksack) {
      elfSet.add(char, true);
    }

    arrayOfSets.push(elfSet);
  });

  const intersection = arrayOfSets.reduce(
    (a, b) => new Set([...a].filter((x) => b.has(x)))
  );

  const [value] = intersection;
  results.push(value);
});

const total = results.reduce((acc, curr) => {
  return acc + mapLettersToNumbers(curr);
}, 0);

console.log(total);
