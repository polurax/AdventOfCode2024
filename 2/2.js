const { readFileSync } = require('fs');

const datas = readFileSync('2/data.txt')
  .toString()
  .split('\n')
  .slice(0, -1)
  .map(v => v.split(' ').map(Number));

const isNotSafe = (a, b, isInc) => {
  let diff = a - b;
  return isInc !== null && isInc !== (diff > 0) ||
    diff === 0 ||
    diff > 3 ||
    diff < -3;
}

const lineIsSafe = (line) => {
  let isInc = null;
  let i = 1;

  while (i < line.length) {
    if (isNotSafe(line[i], line[i - 1], isInc)) {
      return false;
    }
    isInc ??= line[i] > line[i - 1];
    i++;
  }

  return true;
}

const result = datas.reduce((acc, line) => {
  // There are probably more optimized ones, but this is the simplest one I found
  const isSafe = lineIsSafe(line) || line.some((_, omitI, arr) => lineIsSafe(arr.filter((_, i) => i !== omitI)));
  return isSafe ? acc + 1 : acc;
}, 0);
console.log(result);