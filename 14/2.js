const { readFileSync } = require('fs');

const lines = readFileSync('14/data.txt').toString().slice(0, -1).split('\n').map(v => v.match(/-?\d+/g).map(Number));

let sizeX = 101;
let sizeY = 103;
let iterations = 10000;

const getEmptyMap = () => {
  const map = [];
  for (let y = 0; y < sizeY; y++) {
    map.push([])
    for (let y = 0; y < sizeX; y++) {
      map.at(-1).push(0);
    }
  }
  return map;
}

for (let i = 0; i <= iterations; i++) {
  const map = getEmptyMap();
  for (const [px, py, vx, vy] of lines) {
    const x = (vx * i + px + sizeX * i) % sizeX;
    const y = (vy * i + py + sizeY * i) % sizeY;
    map[y][x]++;
  }

  // require('fs').writeFileSync("14/result.txt", `Iteration ${i}\n` + map.map(line => '.' + line.map(v => v ? 'o' : ' ').join('')).join('\n') + '\n\n', { flag: 'a+' });

  if ((i - 14) % 101 === 0 && (i - 64) % 103 === 0) {
    console.log('Iteration', i);
    console.log(map.map(line => line.map(v => v ? 'o' : ' ').join('')).join('\n'))
    break;
  }
}