const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split(/\n/);

// console.log(input);

let walls = new Set();

input.forEach((line) => {
  line = line.trim();

  let coords = line.split(" -> ");
  coords = coords.map((coord) => coord.split(",").map((x) => parseInt(x)));

  for (let i = 1; i < coords.length; i++) {
    let minX = Math.min(coords[i - 1][0], coords[i][0]);
    let maxX = Math.max(coords[i - 1][0], coords[i][0]);
    let minY = Math.min(coords[i - 1][1], coords[i][1]);
    let maxY = Math.max(coords[i - 1][1], coords[i][1]);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        walls.add(`${x},${y}`);
      }
    }
  }
});

let sandStart = { x: 500, y: 0 };
let numberOfSands = 0;
let overflow = false;

let lowestWall = [...walls].reduce(
  (lowest, point) => Math.max(parseInt(point.split(",")[1]), lowest),
  0
);

while (!overflow) {
  // reset sand position
  sandStart = { x: 500, y: 0 };

  // increment numberOfSands
  numberOfSands++;

  while (!overflow) {
    // if next line has a wall...
    if (walls.has(`${sandStart.x},${sandStart.y + 1}`)) {
      // check if there is a wall to the left and right in the next line
      if (!walls.has(`${sandStart.x - 1},${sandStart.y + 1}`)) {
        // if not, try fill the space to the left in the next line
        sandStart.x--;
        sandStart.y++;
      } else if (!walls.has(`${sandStart.x + 1},${sandStart.y + 1}`)) {
        sandStart.x++;
        sandStart.y++;
      } else {
        // if there are not walls to the left and to the right in the next line, add it to the set then break from this loop
        walls.add(`${sandStart.x},${sandStart.y}`);
        break;
      }
    } else {
      // if there is no wall in the next line, move down
      sandStart.y++;
    }

    // if the sand reaches below the lowest wall, set overflow to true and break from both loops
    if (sandStart.y > lowestWall) {
      overflow = true;
    }
  }
}

// decrement 1 because we need to check for the sand that overflows
let result = numberOfSands - 1;

console.log(result);
