const { readFileSync } = require('fs');

const datas = readFileSync('4/data.txt').toString().slice(0, -1).split('\n').map(v => v.split(''));

let result = 0;
for (let y = 0; y < datas.length; y++) {
  const line = datas[y];
  for (let x = 0; x < line.length; x++) {
    const char = line[x];
    if (char === 'A' && (
      datas[y + 1]?.[x + 1] === 'M' && datas[y - 1]?.[x - 1] === 'S' ||
      datas[y - 1]?.[x - 1] === 'M' && datas[y + 1]?.[x + 1] === 'S'
    ) && (
        datas[y - 1]?.[x + 1] === 'M' && datas[y + 1]?.[x - 1] === 'S' ||
        datas[y + 1]?.[x - 1] === 'M' && datas[y - 1]?.[x + 1] === 'S'
      )) {
      result++;
    }
  }
}

console.log(result);