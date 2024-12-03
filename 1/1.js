const { readFileSync } = require('fs');

const [left, right] = readFileSync('1/data.txt').toString().split('\n').slice(0, -1).reduce((acc, v) => {
  const [l, r] = v.split('   ');
  acc[0].push(l);
  acc[1].push(r);
  return acc;
}, [[], []]);
left.sort()
right.sort()
const result = left.reduce((acc, l, i) => {
  const r = right[i];
  const d = l > r ? l - r : r - l;
  return acc + d;
}, 0);
console.log(result);