const { readFileSync } = require('fs');

const lines = readFileSync('12/data.txt').toString().slice(0, -1).split('\n');

let result = 0;

const explored = new Set();

const countFaces = (obj) => {
  let count = 0;
  for (const values of Object.values(obj)) {
    values.sort((a, b) => a > b ? 1 : -1);
    if (values.at(-1) - values[0] === values.length - 1) count++;
    else {
      let isFence = false;
      for (let v = values[0]; v <= values.at(-1); v++) {
        if (v === values[0]) {
          values.shift();
          if (!isFence) {
            isFence = true;
            count++;
          }
        } else isFence = false;
      }
    }
  }
  return count;
}

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    if (explored.has(`${x}-${y}`)) continue;

    const queue = [[x, y]];
    let top_fence = {};
    let bottom_fence = {};
    let left_fence = {};
    let right_fence = {};
    let area = 0;
    while (queue.length) {
      const [x, y] = queue.pop();
      if (explored.has(`${x}-${y}`)) continue;
      explored.add(`${x}-${y}`);

      const value = lines[y]?.[x];
      area++;

      if (value !== lines[y - 1]?.[x]) {
        top_fence[y] ??= []
        top_fence[y].push(x);
      } else queue.push([x, y - 1]);

      if (value !== lines[y + 1]?.[x]) {
        bottom_fence[y + 1] ??= []
        bottom_fence[y + 1].push(x);
      } else queue.push([x, y + 1]);

      if (value !== lines[y]?.[x - 1]) {
        left_fence[x] ??= []
        left_fence[x].push(y);
      } else queue.push([x - 1, y]);

      if (value !== lines[y]?.[x + 1]) {
        right_fence[x + 1] ??= []
        right_fence[x + 1].push(y);
      } else queue.push([x + 1, y]);
    }

    const faces = countFaces(top_fence) +
      countFaces(bottom_fence) +
      countFaces(left_fence) +
      countFaces(right_fence);

    result += area * faces;
  }
}

console.log(result);