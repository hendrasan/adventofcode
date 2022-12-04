const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split("\n");

// console.log(input);

function range(min, max) {
  var len = max - min + 1;
  var arr = new Array(len);
  for (var i = 0; i < len; i++) {
    arr[i] = parseInt(min, 10) + i;
  }
  return arr;
}

const everyInclude = (arr, target) => target.every((v) => arr.includes(v));

let sum = 0;

input.forEach((line, i) => {
  let [elf1, elf2] = line.trim().split(",");
  // console.log("elf1", elf1);
  // console.log("elf2", elf2);

  elf1Arr = range(elf1.split("-")[0], elf1.split("-")[1]);
  elf2Arr = range(elf2.split("-")[0], elf2.split("-")[1]);
  // console.log("elf1Arr", elf1Arr);
  // console.log("elf2Arr", elf2Arr);

  if (everyInclude(elf1Arr, elf2Arr) || everyInclude(elf2Arr, elf1Arr)) {
    sum++;
  }
});

console.log(sum);
