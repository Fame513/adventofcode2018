import {getInput, getTestFunction} from './helper';

const DAY = 21;

const methods = {
  addr: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    result[code[3]] = input[code[1]] + input[code[2]];
    return result;
  },

  addi: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    result[code[3]] = input[code[1]] + code[2];
    return result;
  },

  mulr: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    result[code[3]] = input[code[1]] * input[code[2]];
    return result;
  },

  muli: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    result[code[3]] = input[code[1]] * code[2];
    return result;
  },

  banr: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    result[code[3]] = input[code[1]] & input[code[2]];
    return result;
  },

  bani: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    result[code[3]] = input[code[1]] & code[2];
    return result;
  },

  borr: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    result[code[3]] = input[code[1]] | input[code[2]];
    return result;
  },

  bori: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    result[code[3]] = input[code[1]] | code[2];
    return result;
  },

  setr: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    result[code[3]] = input[code[1]];
    return result;
  },

  seti: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    result[code[3]] = code[1];
    return result;
  },

  gtir: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    result[code[3]] = code[1] > input[code[2]] ? 1 : 0;
    return result;
  },

  gtri: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    result[code[3]] = input[code[1]] > code[2] ? 1 : 0;
    return result;
  },

  gtrr: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    result[code[3]] = input[code[1]] > input[code[2]] ? 1 : 0;
    return result;
  },

  eqir: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    result[code[3]] = code[1] === input[code[2]] ? 1 : 0;
    return result;
  },

  eqri: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    result[code[3]] = input[code[1]] === code[2] ? 1 : 0;
    return result;
  },

  eqrr: function (input: number[], code: number[]): number[] {
    const result = input.slice();
    result[code[3]] = input[code[1]] === input[code[2]] ? 1 : 0;
    return result;
  }
};

run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input, ip) {
  console.log('part 1');
  let regs = [0, 0, 0, 0, 0, 0];
  while (regs[ip] < input.length) {
    if (regs[ip] === 28) {
        return regs[4];
    }
    regs = methods[input[regs[ip]][0]](regs, input[regs[ip]]);
    regs[ip]++;
  }

}


function calculatePart2() {
  let a = 0, b;
  let prev;
  const map = {};
  while (true) {
    b = a | 0x10000;
    a = 10704114;
    while (b >= 256) {
      a = (((a + (b & 0xff)) & 0xffffff) * 65899) & 0xffffff;
      b = Math.floor(b / 256);
    }
    a = (((a + (b & 0xff)) & 0xffffff) * 65899) & 0xffffff;
    if (map[a]) {
      // console.log(Object.keys(map).length);
      return prev;
    } else {
      prev = a;
      map[a] = true;
    }
  }
}

function parse(input: string): (number | string)[][] {
  const regexp = /(.{4}) (\d+) (\d+) (\d+)/;
  return input.split('\n')
    .slice(1)
    .map(row => row.match(regexp))
    .map(val => [val[1], +val[2], +val[3], +val[4]]);
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculatePart1(parse(input), 1);
  const result2 = calculatePart2();
  return [result1, result2];
}
