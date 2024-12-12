const { readFileSync } = require('fs');

const lines = readFileSync('11/data.txt').toString().slice(0, -1).split(' ').map(Number);
const caches = new Map();

const ITERATION = 75;

const process = (value, iteration) => {
  if (iteration === ITERATION) {
    return 1;
  }

  const cache = caches.get(iteration);
  if (cache.has(value)) {
    return cache.get(value);
  }

  let result;
  if (value === 0) {
    result = process(1, iteration + 1);
  } else {
    const length = Math.ceil(Math.log10(value + 1));
    if (length % 2 === 0) {
      const separator = 10 ** (length / 2);
      result = (
        process(Math.floor(value / separator), iteration + 1) +
        process(value % separator, iteration + 1)
      );
    } else result = process(value * 2024, iteration + 1);
  }

  cache.set(value, result);
  return result;
};

for (let i = 0; i < ITERATION; i++) {
  caches.set(i, new Map());
}

const result = lines.reduce((acc, next) => {
  return acc + process(next, 0);
}, 0);

console.log(result);