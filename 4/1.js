const { readFileSync } = require('fs');

const datas = readFileSync('4/data.txt').toString().slice(0, -1).split('\n').map(v => v.split(''));

let result = 0;
for (let y = 0; y < datas.length; y++) {
  const line = datas[y];
  for (let x = 0; x < line.length; x++) {
    const char = line[x];
    if (char === 'X') {
      if (datas[y]?.[x + 1] === 'M' && datas[y]?.[x + 2] === 'A' && datas[y]?.[x + 3] === 'S') result++;
      if (datas[y + 1]?.[x + 1] === 'M' && datas[y + 2]?.[x + 2] === 'A' && datas[y + 3]?.[x + 3] === 'S') result++;
      if (datas[y + 1]?.[x] === 'M' && datas[y + 2]?.[x] === 'A' && datas[y + 3]?.[x] === 'S') result++;
      if (datas[y + 1]?.[x - 1] === 'M' && datas[y + 2]?.[x - 2] === 'A' && datas[y + 3]?.[x - 3] === 'S') result++;
      if (datas[y]?.[x - 1] === 'M' && datas[y]?.[x - 2] === 'A' && datas[y][x - 3] === 'S') result++;
      if (datas[y - 1]?.[x - 1] === 'M' && datas[y - 2]?.[x - 2] === 'A' && datas[y - 3]?.[x - 3] === 'S') result++;
      if (datas[y - 1]?.[x] === 'M' && datas[y - 2]?.[x] === 'A' && datas[y - 3]?.[x] === 'S') result++;
      if (datas[y - 1]?.[x + 1] === 'M' && datas[y - 2]?.[x + 2] === 'A' && datas[y - 3]?.[x + 3] === 'S') result++;
    }
  }
}

console.log(result);