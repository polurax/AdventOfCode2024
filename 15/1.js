const { readFileSync } = require('fs');

const [map_, moves_] = readFileSync('15/data.txt').toString().slice(0, -1).split('\n\n');
const map = map_.split('\n').map(v => v.split(''));
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

const push = ([px, py], [dx, dy]) => {
  switch (map[py + dy][px + dx]) {
    case 'O':
      if (!push([px + dx, py + dy], [dx, dy])) {
        return false;
      }
    case '.':
      map[py + dy][px + dx] = map[py][px];
      map[py][px] = '.';
      return true;
    case '#':
      return false;
    default:
      break;
  }
}

const vectors = {
  '^': [0, -1],
  '>': [1, 0],
  'v': [0, 1],
  '<': [-1, 0],
}

for (const move of moves) {
  if (push(robot, vectors[move])) {
    robot[0] += vectors[move][0];
    robot[1] += vectors[move][1];
  }
}

let result = 0;
for (let y = 0; y < map.length; y++) {
  console.log(map[y].join(''))
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === 'O') {
      result += y * 100 + x;
    }
  }
}

console.log(result);