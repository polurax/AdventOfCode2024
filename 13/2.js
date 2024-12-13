const { readFileSync } = require('fs');

const lines = readFileSync('13/data.txt').toString().slice(0, -1).split('\n\n').map(v => v.split('\n').map(v => v.match(/\d+/g).map(Number)));
let result = 0;

for (let [[x1, y1], [x2, y2], [X, Y]] of lines) {
  X += 10000000000000;
  Y += 10000000000000;
  const denominator = x1 * y2 - x2 * y1;
  if (denominator !== 0) {
    const a = (X * y2 - Y * x2) / denominator;
    const b = (Y * x1 - X * y1) / denominator;
    if (a % 1 === 0 && b % 1 === 0) {
      result += a * 3 + b;
    }
  }
}

console.log(result);