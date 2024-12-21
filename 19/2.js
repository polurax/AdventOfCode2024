const { readFileSync } = require('fs');

const [towels_, models_] = readFileSync('19/data.txt').toString().slice(0, -1).split('\n\n');
const towels = towels_.split(', ');
const models = models_.split('\n');

const towelMap = {};
const addTowelToMap = (towel, map, complete) => {
  if (towel.length === 0) {
    map['complete'] = complete;
  } else {
    map[towel[0]] ??= {};
    addTowelToMap(towel.slice(1), map[towel[0]], complete);
  }
}

const getTowelInMap = (model, map) => {
  let arr = [];

  if (model.length === 0 || !map[model[0]]) {
    arr = [];
  } else {
    arr = getTowelInMap(model.slice(1), map[model[0]])
  }
  if (map['complete']) {
    arr.push(map['complete']);
  }

  return arr;
}

const possibleModel = (model, cache) => {
  const value = getTowelInMap(model, towelMap).map((str) => {
    let newModel = model.slice(str.length);
    if (newModel.length === 0) return 1;
    if (cache.has(newModel)) return cache.get(newModel);
    return possibleModel(newModel, cache);
  }).reduce((a, b) => a + b, 0)

  cache.set(model, value);

  return value;
}

for (const towel of towels) {
  addTowelToMap(towel, towelMap, towel);
}

let result = 0;
for (const model of models) {
  result += possibleModel(model, new Map());
}
console.log(result)