const { readFileSync } = require('fs');

const lines = readFileSync('7/data.txt').toString().slice(0, -1).split('\n').map(v => v.replace(':', '').split(' ').map(Number));

let result = 0;

const calc = (expect, current, others) => {
  if (!others.length) {
    return expect === current;
  }
  const [next, ...nextOthers] = others
  return calc(expect, current + next, nextOthers) ||
    calc(expect, current * next, nextOthers) ||
    calc(expect, Number(String(current) + String(next)), nextOthers);
}

for (let lineI = 0; lineI < lines.length; lineI++) {
  const [expect, ...params] = lines[lineI];
  if (calc(expect, params.shift(), params)) {
    result += expect;
  }
}

console.log(result);