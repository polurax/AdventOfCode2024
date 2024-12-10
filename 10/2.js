const { readFileSync } = require('fs');

const lines = readFileSync('10/data.txt').toString().slice(0, -1).split('\n').map(v => v.split('').map(Number));

let result = 0;

const findTrailheads = (x, y) => {
  const value = lines[y][x];
  if (value === 9) {
    result++;
    return;
  }
  if (value + 1 === lines[y + 1]?.[x]) findTrailheads(x, y + 1);
  if (value + 1 === lines[y][x + 1]) findTrailheads(x + 1, y);
  if (value + 1 === lines[y][x - 1]) findTrailheads(x - 1, y);
  if (value + 1 === lines[y - 1]?.[x]) findTrailheads(x, y - 1);
}

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    if (lines[y][x] === 0) findTrailheads(x, y);
  }
}

console.log(result);