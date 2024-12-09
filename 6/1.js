const { readFileSync } = require('fs');

const lines = readFileSync('6/data.txt').toString().slice(0, -1).split('\n');
const guard = {
  y: null,
  x: null,
  direction: null,
};
const path = new Set();

const getFront = () => {
  switch (guard.direction) {
    case '^':
      return [guard.x, guard.y - 1]
    case 'v':
      return [guard.x, guard.y + 1]
    case '>':
      return [guard.x + 1, guard.y]
    case '<':
      return [guard.x - 1, guard.y]
    default:
      console.error('unknown char ' + lines[y][x]);
  }
}

find_guard: for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    if (['^', 'v', '<', '>'].includes(lines[y][x])) {
      guard.y = y;
      guard.x = x;
      guard.direction = lines[y][x];
      break find_guard;
    }
  }
}

xMin = 0;
yMin = 0;
xMax = lines[0].length;
yMax = lines.length;

while (guard.x >= xMin && guard.x < xMax && guard.y >= yMin && guard.y < yMax) {
  path.add(`${guard.x}-${guard.y}`);

  let [x, y] = getFront()
  while (lines[y]?.[x] === '#') {
    if (guard.direction === '^') guard.direction = '>';
    else if (guard.direction === '>') guard.direction = 'v';
    else if (guard.direction === 'v') guard.direction = '<';
    else if (guard.direction === '<') guard.direction = '^';
    else console.error('unknown char ' + lines[y][x]);
    [x, y] = getFront()
  }

  guard.y = y;
  guard.x = x;
}

console.log(path.size);