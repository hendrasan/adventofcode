const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split("\n");

let dir = "/";
let tree = { "/": { files: [], dirs: [], size: 0 } };
let finalDirs = {};

input.forEach((line, i) => {
  line = line.trim();

  if (line.startsWith("$ cd /") || line.startsWith("$ ls")) {
    return;
  } else if (line.startsWith("dir")) {
    // if the dir consists of only other dirs, we should register the dir to the tree
    if (!tree[dir]) {
      tree[dir] = { files: [], dirs: [], size: 0 };
    }
  } else if (line.startsWith("$ cd")) {
    let to = line.substring(5);
    // console.log("to", to);
    // console.log("dir (before)", dir);

    parentDir = dir;
    if (to == "..") {
      // get substring of second to last / in dir, so for example /a/b/c/ would become /a/b/
      dir = dir.split("/").slice(0, -2).join("/") + "/";
    } else {
      dir = dir + to + "/";
      !tree[parentDir]?.dirs.includes(dir) && tree[parentDir]?.dirs.push(dir);
    }
    // console.log("dir (after)", dir);
  } else {
    const [size, name] = line.split(" ");

    tree[dir] = tree[dir] || { files: [], dirs: [], size: 0 };
    tree[dir].files.push(name);
    tree[dir].size += parseInt(size);
  }
});

// console.log("tree", tree);

// Thanks, ChatGPT!
function computeDirSize(obj, entry) {
  let size = 0;

  // Check if the entry has a size property
  if (obj[entry]?.size) {
    size += obj[entry].size;
  }

  // Check if the entry has any subdirectories
  if (obj[entry]?.dirs.length > 0) {
    // Iterate through the subdirectories
    for (let dir of obj[entry].dirs) {
      // Recursively compute the size of the subdirectory
      size += computeDirSize(obj, dir);
    }
  }

  return size;
}

for (let entry in tree) {
  let size = computeDirSize(tree, entry);
  finalDirs[entry] = size;
}

// console.log(finalDirs);

console.log(
  Object.values(finalDirs)
    .filter((size) => size <= 100000)
    .reduce((acc, size) => acc + size)
);
