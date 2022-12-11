const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split(/\n\s*\n/);

let monkeys = [];

input.forEach((monkey, i) => {
  const monkeyLines = monkey.split(/\n/);

  let monkeyObj = {
    items: [],
    increaseWorry: null,
    divisor: null,
    ifTrue: null,
    ifFalse: null,
    inspections: 0,
  };

  monkeyLines.forEach((line, j) => {
    line = line.trim();

    if (line.includes("Starting items:")) {
      const items = line
        .split(":")[1]
        .trim()
        .split(", ")
        .map((item) => parseInt(item));
      monkeyObj.items = items;
    }

    if (line.includes("Operation: new = ")) {
      monkeyObj.increaseWorry = (worry) => {
        const operation = line.split(" = ")[1].trim();
        let [x, operand, y] = operation.split(" ");

        if (y === "old") {
          y = worry;
        }

        y = parseInt(y);

        let calc = null;
        if (operand === "*") {
          calc = worry * y;
        } else if (operand === "+") {
          calc = worry + y;
        } else if (operand === "-") {
          calc = worry - y;
        }
        return calc;
      };
    }

    if (line.includes("Test: divisible by ")) {
      const divBy = parseInt(line.split("by ")[1].trim());
      monkeyObj.divisor = divBy;
    }

    if (line.includes("If true: throw to monkey ")) {
      const destMonkey = parseInt(
        line.split("If true: throw to monkey ")[1].trim()
      );
      monkeyObj.ifTrue = destMonkey;
    }

    if (line.includes("If false: throw to monkey ")) {
      const destMonkey = parseInt(
        line.split("If false: throw to monkey ")[1].trim()
      );
      monkeyObj.ifFalse = destMonkey;
    }
  });

  monkeys.push(monkeyObj);
});

// wtf?
const lcm = monkeys.reduce((acc, curr) => acc * curr.divisor, 1);
console.log(lcm);

function processRound() {
  monkeys.forEach((monkey, i) => {
    if (monkey.items.length === 0) {
      return;
    }

    // console.log("===Monkey ", i);

    // monkey.items.forEach((item) => {
    while (monkey.items.length) {
      // inspect
      monkey.inspections += 1;

      // increaseWorry
      let worry = monkey.items.shift();
      // console.log("Monkey inspects an item with a worry level of ", worry);

      worry = monkey.increaseWorry(worry);
      // console.log("  Worry level increases to ", worry);

      // mod by lcm to manage worry level
      worry = Math.floor(worry % lcm);
      // console.log(
      //   "  Monkey gets bored with item. Worry level is divided by 3 to ",
      //   worry
      // );

      // check with test case
      let monkeyToThrow =
        worry % monkey.divisor === 0 ? monkey.ifTrue : monkey.ifFalse;
      // console.log(
      //   "  Check if worry level is divisible by ",
      //   monkey.divisor,
      //   worry % monkey.divisor === 0
      // );

      // throw to other monkey
      // console.log(
      //   "  Item with worry level",
      //   worry,
      //   "thrown to monkey",
      //   monkeyToThrow
      // );
      monkeys[monkeyToThrow].items.push(worry);
    }
    // });
  });
}

for (let i = 1; i <= 10000; i++) {
  processRound();
  // console.log("After Round", i);
  // monkeys.map((monkey, i) => {
  //   console.log("Monkey", i, "inspected items", monkey.inspections);
  // });
}

const topTwo = monkeys
  .sort((a, b) => b.inspections - a.inspections)
  .slice(0, 2);

console.log(topTwo.reduce((acc, cur) => acc * cur.inspections, 1));

// console.log(monkeys);
