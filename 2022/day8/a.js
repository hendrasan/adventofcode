const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split("\n");

const treesArr = [];

input.forEach((line, i) => {
  line = line.trim();

  treesArr.push(line.split("").map((item) => parseInt(item)));
});

// console.log(treesArr);

let count = 0;

for (let i = 0; i < treesArr.length; i++) {
  for (let j = 0; j < treesArr[i].length; j++) {
    // count the edges
    if (
      i === 0 ||
      i === treesArr.length - 1 ||
      j === 0 ||
      j === treesArr.length - 1
    ) {
      count++;
      continue;
    }

    let topVisible = true,
      bottomVisible = true,
      leftVisible = true,
      rightVisible = true;
    let topSearchFinished,
      bottomSearchFinished,
      leftSearchFinished,
      rightSearchFinished;
    const current = treesArr[i][j];
    // console.log("====row", i);
    // console.log("====col", j);
    // console.log("cur", current);

    // for every element, check if the elements to the top and bottom and left and right have any number greater than it
    for (let m = 1; m < treesArr.length - 1; m++) {
      if (!topSearchFinished && i - m >= 0) {
        const top = treesArr[i - m][j];
        if (current <= top) {
          topVisible = false;
          topSearchFinished = true;
        }
        // console.log("top visible", topVisible);
      }
      if (!leftSearchFinished && j - m >= 0) {
        const left = treesArr[i][j - m];
        if (current <= left) {
          leftVisible = false;
          leftSearchFinished = true;
        }
        // console.log("left visible", leftVisible);
      }
      if (!bottomSearchFinished && i + m <= treesArr.length - 1) {
        const bottom = treesArr[i + m][j];

        if (current <= bottom) {
          bottomVisible = false;
          bottomSearchFinished = true;
        }
        // console.log("bottom visible", bottomVisible);
      }
      if (!rightSearchFinished && j + m <= treesArr.length - 1) {
        const right = treesArr[i][j + m];
        if (current <= right) {
          rightVisible = false;
          rightSearchFinished = true;
        }
        // console.log("right visible", rightVisible);
      }
    }

    const isVisible =
      topVisible || bottomVisible || leftVisible || rightVisible;

    // console.log("isVisible", isVisible);
    if (isVisible) {
      count++;
    }
  }
}

console.log(count);
