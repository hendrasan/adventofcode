const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split(/\n\s*\n/);

let pairs = [];

input.forEach((pair, i) => {
  pairs.push(pair.split(/\n/));
});

let inOrderArrays = [];

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

pairs.forEach((pair, i) => {
  i++;
  let [left, right] = pair;
  left = JSON.parse(left.trim());
  right = JSON.parse(right.trim());
  // console.log(left, right);

  let isInOrder = compare(left, right);

  if (isInOrder) {
    // console.log(i, " is in order");
    inOrderArrays.push(i);
  } else {
    // console.log(i, " is not in order");
  }
  // console.log("=====\n");
});

console.log(inOrderArrays.reduce((a, b) => a + b, 0));
