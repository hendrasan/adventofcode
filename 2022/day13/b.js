const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split(/\n/);

let pairs = input
  .map((pair) => pair.trim())
  .filter((element) => element !== "")
  .map((pair) => JSON.parse(pair));

pairs.push([[2]], [[6]]);

function compare(left, right) {
  if (typeof left === "number" && typeof right === "number") {
    if (left > right) return false;
    if (left < right) return true;
    return null;
  } else if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      let result = compare(left[i], right[i]);
      if (result != null) return result;
    }

    if (left.length < right.length) {
      return true;
    } else if (left.length > right.length) {
      return false;
    }

    return null;
  } else {
    return compare(
      typeof left === "number" ? [left] : left,
      typeof right === "number" ? [right] : right
    );
  }
}

pairs.sort((left, right) => {
  let result = compare(left, right);
  // console.log(left, right, "result", result);
  if (result != null) {
    return result ? -1 : 1;
  } else {
    return 0;
  }
});

let first = 1,
  second = 1;

pairs.forEach((pair, i) => {
  i++;
  // console.log(i, pair);
  if (JSON.stringify(pair) === JSON.stringify([[2]])) {
    first = i;
  }

  if (JSON.stringify(pair) === JSON.stringify([[6]])) {
    second = i;
  }
});

console.log(first * second);
