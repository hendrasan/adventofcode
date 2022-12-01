const { input } = require("./input");

let inventory = [];

input.forEach((elf, i) => {
  const sum = elf.reduce((acc, curr) => acc + curr, 0);
  inventory.push(sum);
});

const topThreeTotal = inventory
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, curr) => acc + curr);

console.log(topThreeTotal);
