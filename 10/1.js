const { readFileSync } = require('fs');

const lines = readFileSync('10/data.txt').toString().slice(0, -1).split('\n').map(v => v.split('').map(Number));

let result = 0;

const findTrailheads = (x, y, targets) => {
  const value = lines[y][x];
  if (value === 9) {
    if (!targets.has(`${x}-${y}`)) {
      targets.add(`${x}-${y}`)
      result++;
    }
    return;
  }
  if (value + 1 === lines[y + 1]?.[x]) findTrailheads(x, y + 1, targets);
  if (value + 1 === lines[y][x + 1]) findTrailheads(x + 1, y, targets);
  if (value + 1 === lines[y][x - 1]) findTrailheads(x - 1, y, targets);
  if (value + 1 === lines[y - 1]?.[x]) findTrailheads(x, y - 1, targets);
}

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    if (lines[y][x] === 0) findTrailheads(x, y, new Set());
  }
}

console.log(result);