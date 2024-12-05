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
  const isCorrect = series[s].every((b, i, serie) => serie.slice(i).every(a => !mustBefore(a, b)))

  if (isCorrect) correct.push(series[s]);
}

const result = correct.reduce((acc, v) => {
  return acc + v[Math.trunc(v.length / 2)]
}, 0)

console.log(result);