const { readFileSync } = require('fs');

const lines = readFileSync('12/data.txt').toString().slice(0, -1).split('\n');

let result = 0;

const explored = new Set();

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    if (explored.has(`${x}-${y}`)) continue;

    const queue = [[x, y]];
    let perimeter = 0;
    let area = 0;
    while (queue.length) {
      const [x, y] = queue.pop();
      if (explored.has(`${x}-${y}`)) continue;
      explored.add(`${x}-${y}`);

      const value = lines[y]?.[x];
      area++;
      if (value !== lines[y - 1]?.[x]) perimeter++;
      else queue.push([x, y - 1]);
      if (value !== lines[y + 1]?.[x]) perimeter++;
      else queue.push([x, y + 1]);
      if (value !== lines[y]?.[x - 1]) perimeter++;
      else queue.push([x - 1, y]);
      if (value !== lines[y]?.[x + 1]) perimeter++;
      else queue.push([x + 1, y]);
    }

    result += area * perimeter;
  }
}

console.log(result);