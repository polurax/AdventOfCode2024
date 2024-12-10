const { readFileSync } = require('fs');

const lines = readFileSync('9/data.txt').toString().slice(0, -1).split('').map(Number);

let result = 0;
let resultI = 0;
const partMoved = new Set();

const checksumPart = (part_i, result_i) => {
  const id = part_i / 2;
  const average = (result_i * 2 + lines[part_i] - 1) / 2;
  return id * average * lines[part_i];
}

for (let beginI = 0; beginI < lines.length; beginI++) {
  if (beginI % 2 === 0) {
    if (!partMoved.has(beginI)) {
      result += checksumPart(beginI, resultI);
    }
    resultI += lines[beginI];
  } else {
    let free = lines[beginI];
    move_block: while (free > 0) {
      for (let endI = lines.length - 1; endI > beginI; endI -= 2) {
        if (lines[endI] <= free && !partMoved.has(endI)) {
          result += checksumPart(endI, resultI);
          resultI += lines[endI];
          free -= lines[endI];
          partMoved.add(endI);
          continue move_block;
        }
      }
      resultI += free;
      free = 0;
    }
  }
}

console.log(result);