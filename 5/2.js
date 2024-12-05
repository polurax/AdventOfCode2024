const { readFileSync } = require('fs');

const [rules_, series_] = readFileSync('5/data.txt').toString().slice(0, -1).split('\n\n');
const rules = rules_.split('\n').map(v => v.split('|').map(Number)).reduce((acc, [l, r]) => {
  acc[l] ??= [];
  acc[l].push(r);
  return acc;
}, {});
const series = series_.split('\n').map(v => v.split(',').map(Number));

const mustBefore = (a, b) => rules[a]?.includes(b);

const correct = [];

for (let s = 0; s < series.length; s++) {
  const serie = series[s];
  let isCorrected = false;
  for (let i = 0; i < serie.length; i++) {
    for (let j = i; j < serie.length; j++) {
      if (mustBefore(serie[j], serie[i])) {
        serie.splice(i, 1, serie[j], serie[i]);
        serie.splice(j + 1, 1);
        isCorrected ||= true;
        i--;
        break;
      }
    }
  }
  if (isCorrected) {
    correct.push(serie);
  }
}

const result = correct.reduce((acc, v) => {
  return acc + v[Math.trunc(v.length / 2)]
}, 0)

console.log(result);