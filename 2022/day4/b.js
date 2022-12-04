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

function findCommonElem(arr1, arr2) {
  const map = new Map();

  arr1.forEach((item) => map.set(item, true));

  return arr2.filter((item) => map.has(item));
}

let overlaps = 0;

input.forEach((line, i) => {
  let [elf1, elf2] = line.trim().split(",");
  // console.log("elf1", elf1);
  // console.log("elf2", elf2);

  elf1Arr = range(elf1.split("-")[0], elf1.split("-")[1]);
  elf2Arr = range(elf2.split("-")[0], elf2.split("-")[1]);
  // console.log("elf1Arr", elf1Arr);
  // console.log("elf2Arr", elf2Arr);

  const common = findCommonElem(elf1Arr, elf2Arr);
  // console.log("common", common);

  overlaps += common.length > 0;
});

console.log(overlaps);
