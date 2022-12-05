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
  //   console.log("line", line);

  // split line string by a single space after every x chars
  let parts = splitString(line);
  //   console.log("parts", parts);

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

// console.log(cols);

instructions.split("\n").forEach((line, i) => {
  let matches = line.match(/move (\d+) from (\d+) to (\d+)/);
  let move = matches[1];
  let from = matches[2] - 1;
  let to = matches[3] - 1;

  // console.log("move", move);
  // console.log("from", from);
  // console.log("to", to);

  let temps = [];

  for (let i = 0; i < move; i++) {
    temps.push(cols[from].shift());
  }

  cols[to].unshift(...temps);
});

let result = cols.reduce((acc, curr) => {
  return acc + curr[0];
}, "");

console.log(result);
