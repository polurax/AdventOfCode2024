const { readFileSync } = require('fs');

const datas = readFileSync('2/data.txt')
  .toString()
  .split('\n')
  .slice(0, -1)
  .map(v => v.split(' ').map(Number));

const result = datas.reduce((acc, line) => {
  let isInc = null;
  let i = 1;

  while (i < line.length) {
    const diff = line[i] - line[i - 1];
    isInc ??= diff > 0;

    if (
      diff === 0 ||
      diff > 3 ||
      diff < -3 ||
      isInc !== (diff > 0)
    ) {
      return acc;
    }

    i++;
  }

  return acc + 1;
}, 0);
console.log(result);