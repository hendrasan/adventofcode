const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split("\n");

let cycle = 0;
let spriteMid = 1;
let crt = "";

function draw() {
  if (cycle % 40 === 0) {
    crt += "\n";
  }

  if ([spriteMid - 1, spriteMid, spriteMid + 1].includes(cycle % 40)) {
    crt += "#";
  } else {
    crt += ".";
  }

  cycle += 1;
}

input.forEach((line, i) => {
  line = line.trim();

  const [command, value] = line.split(" ");

  draw();

  if (command === "addx") {
    draw();

    spriteMid += parseInt(value);
  }
});

console.log(crt);
