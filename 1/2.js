const { readFileSync } = require('fs');

const [left, right] = readFileSync('1/data.txt').toString().split('\n').slice(0, -1).reduce((acc, v) => {
  const [l, r] = v.split('   ');
  acc[0].push(l);
  acc[1][r] ??= 0;
  acc[1][r]++;
  return acc;
}, [[], {}]);

const result = left.reduce((acc, v) => {
  return acc + (right[v] ?? 0) * v;
}, 0);
console.log(result);