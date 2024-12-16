const { readFileSync } = require('fs');

const lines = readFileSync('14/data.txt').toString().slice(0, -1).split('\n').map(v => v.match(/-?\d+/g).map(Number));

let topleft = 0;
let topright = 0;
let bottomleft = 0;
let bottomright = 0;

let sizeX = 101;
let sizeY = 103;
let iterations = 100;

for (const [px, py, vx, vy] of lines) {
  const x = (vx * iterations + px + sizeX * iterations) % sizeX;
  const y = (vy * iterations + py + sizeY * iterations) % sizeY;
  if (y < (sizeY - 1) / 2) {
    if (x < (sizeX - 1) / 2) topleft++;
    else if (x > (sizeX - 1) / 2) topright++;
  } else if (y > (sizeY - 1) / 2) {
    if (x < (sizeX - 1) / 2) bottomleft++;
    else if (x > (sizeX - 1) / 2) bottomright++;
  }
}

console.log(topleft * topright * bottomleft * bottomright);