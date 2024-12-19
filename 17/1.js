const { readFileSync } = require('fs');

let A = 0;
let B = 0;
let C = 0;

let cursor = 0;
let next = 2;
let out = [];

const combo = (v) => {
    if (v < 4) return v;
    if (v === 4) return A;
    if (v === 5) return B;
    if (v === 6) return C;
    throw new Error('invalid combo value ' + v)
}

const toBit = (v) => {
    return Number(v).toString(2).split('');
}

const byBit = (v) => {
    return parseInt(v.join(''), 2);
}

const XOR = (v, w) => {
    let V = toBit(v);
    let W = toBit(w);
    while (V.length < W.length) {
        V.unshift('0');
    }
    while (V.length > W.length) {
        W.unshift('0');
    }
    return byBit(V.map((v, i) => W[i] !== v ? '1' : '0'))
}

const instruction = [
    (operand) => {
        A = Math.trunc(A / 2 ** combo(operand))
    },
    (operand) => {
        B = XOR(B, operand)
    },
    (operand) => {
        B = combo(operand) % 8
    },
    (operand) => {
        if (A !== 0) next = operand
    },
    (operand) => {
        B = XOR(B, C)
    },
    (operand) => {
        out.push(combo(operand) % 8)
    },
    (operand) => {
        B = Math.trunc(A / 2 ** combo(operand))
    },
    (operand) => {
        C = Math.trunc(A / 2 ** combo(operand))
    },
]

const [registers, prog] = readFileSync('17/data.txt').toString().slice(0, -1).split('\n\n');
const reg = registers.match(/\d+/g).map(Number);
A = reg[0];
B = reg[1];
C = reg[2];
const program = prog.match(/\d/g).map(Number);

while (cursor < program.length) {
    instruction[program[cursor]](program[cursor + 1])
    cursor = next;
    next += 2;
}

console.log(A, B, C);
console.log(out.join(','))