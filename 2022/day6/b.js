const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

let result = 0;
const packetLength = 14;

for (let i = 0; i < input.length - packetLength + 1; i++) {
  const fourStringsAhead = input.substring(i, i + packetLength);

  let packetsArr = fourStringsAhead.split("");

  let set = new Set(packetsArr);

  if (packetsArr.length === set.size) {
    result = i + packetLength;
    break;
  }
}

console.log(`Got: ${result}`);
