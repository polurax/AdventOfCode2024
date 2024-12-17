const { readFileSync } = require('fs');

const translateMap = {
  '#': ['#', '#'],
  'O': ['[', ']'],
  '.': ['.', '.'],
  '@': ['@', '.']
}

const [map_, moves_] = readFileSync('15/data.txt').toString().slice(0, -1).split('\n\n');
let map = map_.split('\n').map(v => v.split('').flatMap(v => translateMap[v]));
const moves = moves_.replace(/\n/g, '');

let robot;
find_robot: for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === '@') {
      robot = [x, y];
      break find_robot;
    }
  }
}

const push = ([px, py], [dx, dy], actions) => {
  const self = map[py][px];
  //console.log(px, py, self)
  if (self === '#') return false;
  if (self === '@' || dy === 0 && (self === '[' || self === ']')) {
    if (!push([px + dx, py + dy], [dx, dy], actions)) {
      return false;
    }
  } else if (self === '[') {
    if (!push([px + dx + 1, py + dy], [dx, dy], actions) || !push([px + dx, py + dy], [dx, dy], actions)) {
      return false;
    } else {
      actions.add(`${px + 1}|${py}`);
    }
  } else if (self === ']') {
    if (!push([px + dx - 1, py + dy], [dx, dy], actions) || !push([px + dx, py + dy], [dx, dy], actions)) {
      return false;
    } else {
      actions.add(`${px - 1}|${py}`);
    }
  }
  actions.add(`${px}|${py}`);
  return true;
}

const vectors = {
  '^': [0, -1],
  '>': [1, 0],
  'v': [0, 1],
  '<': [-1, 0],
}

for (const move of moves) {
  const map_copy = map.map(l => [...l]);

  const actions = new Set();
  if (push(robot, vectors[move], actions)) {
    robot[0] += vectors[move][0];
    robot[1] += vectors[move][1];
    const arr = Array.from(actions).map(v => v.split('|').map(Number));

    for (const [x, y] of arr) {
      const backX = x + vectors[move][0] * -1;
      const backY = y + vectors[move][1] * -1;
      if (actions.has(`${backX}|${backY}`)) {
        map_copy[y][x] = map[backY][backX];
      } else {
        map_copy[y][x] = '.';
      }
    }
  }

  map = map_copy;
}

let result = 0;
for (let y = 0; y < map.length; y++) {
  console.log(map[y].join(''))
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === '[') {
      result += y * 100 + x;
    }
  }
}

console.log(result);