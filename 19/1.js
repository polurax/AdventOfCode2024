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
  cache.add(model);
  return getTowelInMap(model, towelMap).some(({ length }) => {
    let newModel = model.slice(length);
    return newModel.length === 0 || !cache.has(newModel) && possibleModel(newModel, cache)
  })
}

for (const towel of towels) {
  addTowelToMap(towel, towelMap, towel);
}

let result = 0;
for (const model of models) {
  if (possibleModel(model, new Set())) result++;
}
console.log(result)