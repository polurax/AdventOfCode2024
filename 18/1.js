const { readFileSync } = require('fs');

const toCorrupt = readFileSync('18/data.txt').toString().slice(0, -1).split('\n').map(v => v.split(',').map(Number));
const size = 70;
const corrupted = 1024;

const map = [];

for (let y = 0; y <= size; y++) {
  map.push([]);
  for (let x = 0; x <= size; x++) {
    map.at(-1).push('.');
  }
}

for (let i = 0; i < corrupted; i++) {
  const [x, y] = toCorrupt[i];
  map[y][x] = '#'
}

map[0][0] = 0
for (let c = 0; true; c++) {
  for (let y = 0; y <= size; y++) {
    for (let x = 0; x <= size; x++) {
      if (Number.isInteger(map[y][x]) && map[y][x] === c) {

        const push = (x, y) => {
          if (map[y]?.[x] === '.') {
            map[y][x] = c + 1;
          }
        }

        push(x, y - 1);
        push(x, y + 1);
        push(x - 1, y);
        push(x + 1, y);
      }
    }
  }
  if (map.at(-1).at(-1) !== '.') break;
}

console.log(map.at(-1).at(-1))