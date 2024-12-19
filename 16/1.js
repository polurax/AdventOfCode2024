const { readFileSync } = require('fs');


const map = readFileSync('16/data.txt').toString().slice(0, -1).split('\n');

if (map[map.length - 2][1] !== 'S') console.error('unexpected S place');
const buildingQueue = [];
let end;

const pointMap = new Map();
const getPoint = (x, y) => {
  if (pointMap.has(`${x}|${y}`)) {
    return pointMap.get(`${x}|${y}`);
  }
  const point = {
    y,
    x,
    value: null,
    N: null,
    E: null,
    S: null,
    W: null,
  };
  pointMap.set(`${x}|${y}`, point);
  buildingQueue.push(point);
  return point;
}

const start = getPoint(1, map.length - 2);
while (buildingQueue.length) {
  const point = buildingQueue.pop();
  if (map[point.y][point.x] === 'E') {
    end = point;
  }
  if (!point.N && map[point.y - 1]?.[point.x] !== '#') {
    point.N = getPoint(point.x, point.y - 1);
    point.N.S = point;
  }
  if (!point.E && map[point.y]?.[point.x + 1] !== '#') {
    point.E = getPoint(point.x + 1, point.y);
    point.E.W = point;
  }
  if (!point.S && map[point.y + 1]?.[point.x] !== '#') {
    point.S = getPoint(point.x, point.y + 1);
    point.S.N = point;
  }
  if (!point.W && map[point.y]?.[point.x - 1] !== '#') {
    point.W = getPoint(point.x - 1, point.y);
    point.W.E = point;
  }
}

const visitCost = {
  N: [['N', 1], ['E', 1001], ['W', 1001]],
  E: [['N', 1001], ['E', 1], ['S', 1001]],
  S: [['E', 1001], ['S', 1], ['W', 1001]],
  W: [['N', 1001], ['S', 1001], ['W', 1]],
}

start.value = 0;
const processQueue = [[start, 'E']];
while (processQueue.length) {
  const [point, direction] = processQueue.pop();
  for (const [dir, cost] of visitCost[direction]) {
    if (point[dir] && (point[dir].value === null || point[dir].value > cost + point.value)) {
      point[dir].value = cost + point.value;
      processQueue.push([point[dir], dir]);
    }
  }
}

console.log(end.value);