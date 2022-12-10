const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split("\n");

let cycle = 0;
let x = 1;
let signalStrength = 0;

function tick() {
  cycle += 1;

  if (cycle >= 20 && cycle <= 220 && (cycle + 20) % 40 === 0) {
    signalStrength += cycle * x;
  }
}

input.forEach((line, i) => {
  line = line.trim();

  const [command, value] = line.split(" ");

  tick();

  if (command === "addx") {
    tick();

    x += parseInt(value);
  }
});

console.log(signalStrength);
