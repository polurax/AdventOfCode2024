const { readFileSync } = require('fs');


const map = readFileSync('16/data.txt').toString().slice(0, -1).split('\n');

if (map[map.length - 2][1] !== 'S') console.error('unexpected S place');
const buildingQueue = [];
let end;

const pointMap = new Map();
const joins = new Map();
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
  joins.set(`${x}|${y}`, []);
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
    if (point[dir]) {
      if (point[dir].value === null) {
        point[dir].value = cost + point.value;
        joins.get(`${point[dir].x}|${point[dir].y}`).push(`${point.x}|${point.y}`);
        processQueue.push([point[dir], dir]);
      } else if (point[dir].value > cost + point.value) {
        for (const key of joins.get(`${point[dir].x}|${point[dir].y}`)) {
          const xOther = point[dir].x * 2 - pointMap.get(key).x;
          const yOther = point[dir].y * 2 - pointMap.get(key).y;
          if (pointMap.get(`${xOther}|${yOther}`)?.value === point[dir].value + 1) {
            joins.get(`${xOther}|${yOther}`).push(key);
          }
        }
        point[dir].value = cost + point.value;
        joins.set(`${point[dir].x}|${point[dir].y}`, [`${point.x}|${point.y}`]);
        processQueue.push([point[dir], dir]);
      } else if (point[dir].value === cost + point.value) {
        joins.get(`${point[dir].x}|${point[dir].y}`).push(`${point.x}|${point.y}`);
      } else if (point[dir][dir]?.value === 1 + cost + point.value) {
        joins.get(`${point[dir].x}|${point[dir].y}`).push(`${point.x}|${point.y}`);
      }
    }
  }
}

const seatQueue = [`${end.x}|${end.y}`];
let result = new Set();
while (seatQueue.length) {
  const keyPoint = seatQueue.pop();
  result.add(keyPoint);

  for (const key of joins.get(keyPoint)) {
    seatQueue.push(key);
  }
}

let mapPrint = map.map(v => v.split(''));
for (const [x, y] of Array.from(result).map(v => v.split('|').map(Number))) {
  mapPrint[y][x] = '°';
}
console.log(mapPrint.map(v => v.join('')).join('\n'))

console.log(end.value);
console.log(result.size);