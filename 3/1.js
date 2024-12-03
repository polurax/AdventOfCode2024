const { readFileSync } = require('fs');

const datas = readFileSync('3/data.txt').toString();

const result = datas.match(/mul\(\d{1,3},\d{1,3}\)/g).reduce((acc, str) => {
  const [l, r] = str.slice(4, -1).split(',').map(Number);
  return acc + l * r;
}, 0);

console.log(result);