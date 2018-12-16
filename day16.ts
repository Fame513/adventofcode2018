import {getInput, getTestFunction} from './helper';

const DAY = 16;

// tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

const methods = {
  addr: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    if (result[code[3]] === undefined || input[code[1]] === undefined || input[code[2]] === undefined) {
      return []
    }
    result[code[3]] = input[code[1]] + input[code[2]];
    return result;
  },

  addi: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    if (result[code[3]] === undefined || input[code[1]] === undefined) {
      return []
    }
    result[code[3]] = input[code[1]] + code[2];
    return result;
  },

  mulr: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    if (result[code[3]] === undefined || input[code[1]] === undefined || input[code[2]] === undefined) {
      return []
    }
    result[code[3]] = input[code[1]] * input[code[2]];
    return result;
  },

  muli: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    if (result[code[3]] === undefined || input[code[1]] === undefined) {
      return []
    }
    result[code[3]] = input[code[1]] * code[2];
    return result;
  },

  banr: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    if (result[code[3]] === undefined || input[code[1]] === undefined || input[code[2]] === undefined) {
      return []
    }
    result[code[3]] = input[code[1]] & input[code[2]];
    return result;
  },

  bani: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    if (result[code[3]] === undefined || input[code[1]] === undefined) {
      return []
    }
    result[code[3]] = input[code[1]] & code[2];
    return result;
  },

  borr: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    if (result[code[3]] === undefined || input[code[1]] === undefined || input[code[2]] === undefined) {
      return []
    }
    result[code[3]] = input[code[1]] | input[code[2]];
    return result;
  },

  bori: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    if (result[code[3]] === undefined || input[code[1]] === undefined) {
      return []
    }
    result[code[3]] = input[code[1]] | code[2];
    return result;
  },

  setr: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    if (result[code[3]] === undefined || input[code[1]] === undefined) {
      return []
    }
    result[code[3]] = input[code[1]];
    return result;
  },

  seti: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    if (result[code[3]] === undefined || input[code[1]] === undefined) {
      return []
    }
    result[code[3]] = code[1];
    return result;
  },

  gtir: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    if (result[code[3]] === undefined || code[1] === undefined || input[code[2]] === undefined) {
      return []
    }
    result[code[3]] = code[1] > input[code[2]] ? 1 : 0;
    return result;
  },

  gtri: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    if (result[code[3]] === undefined || input[code[1]] === undefined || code[2] === undefined) {
      return []
    }
    result[code[3]] = input[code[1]] > code[2] ? 1 : 0;
    return result;
  },

  gtrr: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    if (result[code[3]] === undefined || input[code[1]] === undefined || input[code[2]] === undefined) {
      return []
    }
    result[code[3]] = input[code[1]] > input[code[2]] ? 1 : 0;
    return result;
  },

  eqir: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    if (result[code[3]] === undefined || code[1] === undefined || input[code[2]] === undefined) {
      return []
    }
    result[code[3]] = code[1] === input[code[2]] ? 1 : 0;
    return result;
  },

  eqri: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    if (result[code[3]] === undefined || input[code[1]] === undefined || code[2] === undefined) {
      return []
    }
    result[code[3]] = input[code[1]] === code[2] ? 1 : 0;
    return result;
  },

  eqrr: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    if (result[code[3]] === undefined || input[code[1]] === undefined || input[code[2]] === undefined) {
      return []
    }
    result[code[3]] = input[code[1]] === input[code[2]] ? 1 : 0;
    return result;
  }
};

function calculatePart1(input: [{before: number[], code: number[], after: number[]}[], number[][]]) {
  const codes: string[][] = [];
  for (let i = 0; i < 16; i++) {
    codes[i] = Object.keys(methods);
  }
  let result = 0;
  for (const inp of input[0]) {
    let count = 0;
    for (const key in methods) {
      const res = methods[key](inp.before, inp.code);
      if (res.join(',') === inp.after.join(',')) {
        count++;
      } else {
        const ind = codes[inp.code[0]].indexOf(key);
        if (ind >= 0) {
          codes[inp.code[0]].splice(ind, 1);
        }
      }
    }
    if (count >= 3) {
      result++;
    }
  }
  console.log(codes);

  return result;
}

function calculatePart2(input: [{before: number[], code: number[], after: number[]}[], number[][]]) {
  const map = ['bani', 'gtri', 'seti', 'eqir',
  'eqrr', 'borr', 'bori', 'banr',
  'muli', 'eqri', 'mulr', 'gtrr',
  'setr', 'addr', 'gtir', 'addi']
  let regs = [0,0,0,0];
  
  for (const code of input[1]) {
    regs = methods[map[code[0]]](regs, code);
  }
  return regs[0];
}

function parse(input: string): [{before: number[], code: number[], after: number[]}[], number[][]] {
  const [samples, opcodes] = input.split('\n\n\n\n');
  const regexp = /Before: \[(.*)\]\n(.*)\nAfter:  \[(.*)\]/;
  const p1 = samples.split('\n\n')
    .map(row => row.match(regexp))
    .map(val => {
      return {
        before: val[1].split(', ').map(v => +v),
        code: val[2].trim().split(' ').map(v => +v),
        after: val[3].split(', ').map(v => +v)
      }
    });
  const p2 = opcodes.split('\n')
    .map(val => val.trim().split(' ').map(v => +v))
  return [p1, p2];
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculatePart1(parse(input));
  const result2 = calculatePart2(parse(input));
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(parse(input)));
  const part2Test = getTestFunction((input) => calculatePart2(parse(input)));
  part1Test([], 0);
  console.log('---------------------');

  part2Test([], 0);
  console.log('---------------------');
}