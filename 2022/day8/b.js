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

let scenicScores = [...Array(treesArr.length)].map((e) =>
  Array(treesArr.length)
);

for (let i = 0; i < treesArr.length; i++) {
  for (let j = 0; j < treesArr[i].length; j++) {
    const item = treesArr[i][j];

    // count the edges
    if (
      i === 0 ||
      i === treesArr.length - 1 ||
      j === 0 ||
      j === treesArr.length - 1
    ) {
      scenicScores[i][j] = 0;
      continue;
    }

    let topVisible = 0,
      bottomVisible = 0,
      leftVisible = 0,
      rightVisible = 0;
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
        topVisible++;
        if (current <= top) {
          topSearchFinished = true;
        }
        // console.log("top visible", topVisible);
      }
      if (!leftSearchFinished && j - m >= 0) {
        const left = treesArr[i][j - m];
        leftVisible++;
        if (current <= left) {
          leftSearchFinished = true;
        }
        // console.log("left visible", leftVisible);
      }
      if (!bottomSearchFinished && i + m <= treesArr.length - 1) {
        const bottom = treesArr[i + m][j];
        bottomVisible++;
        if (current <= bottom) {
          bottomSearchFinished = true;
        }
        // console.log("bottom visible", bottomVisible);
      }
      if (!rightSearchFinished && j + m <= treesArr.length - 1) {
        const right = treesArr[i][j + m];
        rightVisible++;
        if (current <= right) {
          rightSearchFinished = true;
        }
        // console.log("right visible", rightVisible);
      }
    }

    const scenicScore = topVisible * bottomVisible * leftVisible * rightVisible;

    scenicScores[i][j] = scenicScore;
  }
}

// console.log(scenicScores);
console.log(Math.max(...scenicScores.flat()));
