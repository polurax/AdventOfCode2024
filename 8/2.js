const { readFileSync } = require('fs');

const lines = readFileSync('8/data.txt').toString().slice(0, -1).split('\n');

let places = new Set();
let antennas = {};

const getAntinode = (a, b) => {
  return [2 * a[0] - b[0], 2 * a[1] - b[1]];
}

const isInBounds = (x, y) => {
  return x >= 0 && x < lines[0].length && y >= 0 && y < lines.length;
}

const addWave = (a, b) => {
  if (isInBounds(a[0], a[1])) {
    places.add(`${a[0]}-${a[1]}`);
    addWave(getAntinode(a, b), a);
  }
}

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    if (lines[y][x] !== '.') {
      antennas[lines[y][x]] ??= [];
      antennas[lines[y][x]].push([x, y]);
    }
  }
}

for (const serie of Object.values(antennas)) {
  for (let a = 0; a < serie.length; a++) {
    for (let b = a + 1; b < serie.length; b++) {
      addWave(serie[a], serie[b]);
      addWave(serie[b], serie[a]);
    }
  }
}

console.log(places.size);