const { readFileSync } = require('fs');

const lines = readFileSync('9/data.txt').toString().slice(0, -1).split('').map(Number);

let result = 0;
let beginI = 0;
let endI = lines.length - 1;
let beginValue = lines[beginI];
let endValue = lines[endI];
let resultI = 0;

const checksumPart = (part_i, result_i, value) => {
  const id = part_i / 2;
  const average = (result_i * 2 + value - 1) / 2;
  return id * average * value;
}

while (beginI < endI) {
  if (beginI % 2 === 0) {
    result += checksumPart(beginI, resultI, beginValue);
    resultI += beginValue;
    beginValue = lines[++beginI];
  } else {
    while (beginValue > endValue) {
      result += checksumPart(endI, resultI, endValue);
      resultI += endValue;
      beginValue -= endValue;
      endI -= 2;
      endValue = lines[endI];
    }
    result += checksumPart(endI, resultI, beginValue);
    resultI += beginValue;
    endValue -= beginValue;
    beginValue = lines[++beginI];

    if (endValue === 0) {
      endI -= 2;
      endValue = lines[endI];
    }
  }
}
result += checksumPart(endI, resultI, endValue);

console.log(result);