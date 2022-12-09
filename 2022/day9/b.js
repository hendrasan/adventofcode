const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split("\n");

let knots = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];
let result = new Set();

input.forEach((line, i) => {
  line = line.trim();

  const [dir, steps] = line.split(" ");

  for (let i = 0; i < steps; i++) {
    switch (dir) {
      case "R":
        knots[0][0] += 1;
        break;
      case "L":
        knots[0][0] -= 1;
        break;
      case "U":
        knots[0][1] += 1;
        break;
      case "D":
        knots[0][1] -= 1;
        break;
    }

    updateTails();
  }
});

function updateTails() {
  for (let i = 1; i < knots.length; i++) {
    let dx = knots[i - 1][0] - knots[i][0];
    let dy = knots[i - 1][1] - knots[i][1];

    if (Math.abs(dx) >= 2 || Math.abs(dy) >= 2) {
      knots[i][0] += dx === 0 ? 0 : dx / Math.abs(dx);
      knots[i][1] += dy === 0 ? 0 : dy / Math.abs(dy);
    }

    if (i === knots.length - 1) {
      result.add(knots[i].join(","));
    }
  }
}
console.log(result.size);
