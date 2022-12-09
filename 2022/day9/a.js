const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split("\n");

let head = [0, 0];
let tail = [0, 0];
let result = new Set();

input.forEach((line, i) => {
  line = line.trim();

  const [dir, steps] = line.split(" ");

  for (let i = 0; i < steps; i++) {
    switch (dir) {
      case "R":
        head[0] += 1;
        break;
      case "L":
        head[0] -= 1;
        break;
      case "U":
        head[1] += 1;
        break;
      case "D":
        head[1] -= 1;
        break;
    }

    updateTail();
  }
});

function updateTail() {
  let dx = head[0] - tail[0];
  let dy = head[1] - tail[1];

  if (Math.abs(dx) >= 2 || Math.abs(dy) >= 2) {
    tail[0] += dx === 0 ? 0 : dx / Math.abs(dx);
    tail[1] += dy === 0 ? 0 : dy / Math.abs(dy);
  }

  result.add(tail.join(","));
}

console.log(result.size);
