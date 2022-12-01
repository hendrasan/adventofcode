const { input } = require("./input");

let max = 0;

input.forEach((elf, i) => {
  const sum = elf.reduce((acc, curr) => acc + curr, 0);
  if (sum > max) {
    max = sum;
  }
});

console.log(max);
