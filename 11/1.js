const { readFileSync } = require('fs');

const lines = readFileSync('11/data.txt').toString().slice(0, -1).split(' ').map(Number);

let current = lines;
let next;
for (let blink = 0; blink < 25; blink++) {
  next = [];

  for (const v of current) {
    if (v === 0) next.push(1);
    else {
      const length = Math.ceil(Math.log10(v + 1));

      if (length % 2 === 0) {
        const separator = 10 ** (length / 2);
        next.push(
          Math.floor(v / separator),
          v % separator,
        );
      } else next.push(v * 2024)
    }
  }

  current = next;
}

console.log(current.length);