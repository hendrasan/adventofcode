const path = require("path");
const fs = require("fs");

const [crates, instructions] = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .split(/\n\s*\n/);

function splitString(text) {
  var chunks = [];

  for (var i = 0, charsLength = text.length; i < charsLength; i += 4) {
    chunks.push(text.substring(i + 1, i + 2));
  }

  return chunks;
}

let cratesArr = [];
let colsLength;

crates.split("\n").forEach((line, i) => {
  let parts = splitString(line);

  if (i === crates.split("\n").length - 1) {
    colsLength = splitString(line).map((col) => parseInt(col, 10)).length;
  } else {
    cratesArr.push(parts);
  }
});

let cols = [];

for (let i = 0; i < colsLength; i++) {
  cols[i] = cratesArr
    .reduce((acc, curr) => {
      acc.push(curr[i]);
      return acc;
    }, [])
    .map((col) => col.trim())
    .filter((col) => col !== "");
}

instructions.split("\n").forEach((line, i) => {
  let matches = line.match(/move (\d+) from (\d+) to (\d+)/);
  let move = matches[1];
  let from = matches[2] - 1;
  let to = matches[3] - 1;

  let temps = [];

  for (let i = 0; i < move; i++) {
    temps.push(cols[from].shift());
  }

  for (let i = 0; i < temps.length; i++) {
    cols[to].unshift(temps[i]);
  }
});

let result = cols.reduce((acc, curr) => {
  return acc + curr[0];
}, "");

console.log(result);
