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


// tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input, ip) {
  console.log('part 1');
  let regs = [0,0,0,0,0,0];
  let i = 0;
  while (regs[ip] < input.length) {
    i++;
    if (regs[ip] === 28) {
      return regs[4];
    }
    regs = methods[input[regs[ip]][0]](regs, input[regs[ip]])
    regs[ip]++;
  }

}


function calculatePart2(input) {
  let regs = [0,0,0,0,0,0];
  
  regs[4] = 123; // seti 123 0 4
  regs[4] &= 0x1c8; // bani 4 456 4
  regs[4] = regs[4] === 72 ? 1 : 0; // eqri 4 72 4
  regs[1] += regs[4]; // addr 4 1 1
  regs[1] = 0; // seti 0 0 1
  regs[4] = 0; // seti 0 0 4
  regs[5] = regs[4] | 0x10000; // bori 4 65536 5
  regs[4] = 10704114; // seti 10704114 0 4
  regs[2] = regs[5] & 0xff; // bani 5 255 2
  regs[4] += regs[2]; // addr 4 2 4
  regs[4] &= 0xffffff;// bani 4 16777215 4
  regs[4] *= 65899; // muli 4 65899 4
  regs[4] &= 0xffffff; // bani 4 16777215 4
  regs[2] = 256 > regs[5] ? 1 : 0; // gtir 256 5 2
  regs[1] += regs[2]; // addr 2 1 1
  regs[1]++; // addi 1 1 1
  regs[1] = 27; // seti 27 2 1
  regs[2] = 0; // seti 0 4 2
  regs[3] = regs[2] + 1; // addi 2 1 3
  regs[3] *= 256; // muli 3 256 3
  regs[3] = regs[3] > regs[5] ? 1 : 0; // gtrr 3 5 3
  regs[1] += regs[3]; // addr 3 1 1
  regs[1]++; // addi 1 1 1
  regs[1] = 25; // seti 25 5 1
  regs[2]++; // addi 2 1 2
  regs[1] = 17; // seti 17 5 1
  regs[5] = regs[2];// setr 2 6 5
  regs[1] = 7; // seti 7 8 1
  regs[2] = regs[4] === regs[0] ? 1 : 0; // eqrr 4 0 2
  regs[1] += regs[2]; // addr 2 1 1
  regs[1] = 5; // seti 5 3 1
  
  let a1 = 0, a2 = 0, a3 = 0, a4 = 0, a5 = 0, a0 = 0;
  a4 = 123 & 0x1c8;
  //g1:
  a4 = a4 & 0x1c8;
  if (a4 === 72) {
    a4 = 0;
    a5 = a4  | 0x10000;
    a4 = 10704114;
    a2 = a5 & 0xff;
    a4 = ((a4 + a2) & 0xffffff) * 65899;
    if (a5 < 256) {
      
    }
  } else {
    a4 = 0;
    //goto g1
  }
  
}

function parse(input: string): (number | string)[][] {
  const regexp = /(.{4}) (\d+) (\d+) (\d+)/;
  return input.split('\n')
    .slice(1)
    .map(row => row.match(regexp))
    .map(val => [val[1], +val[2], +val[3], +val[4]])
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculatePart1(parse(input), 1);
  const result2 = calculatePart2(parse(input));
  return [result1, result2]
}

function tests() {
  // const part1Test = getTestFunction((input) => calculatePart1(parse(input)));
  // const part2Test = getTestFunction((input) => calculatePart2(parse(input)));
  // part1Test([], 0);
  // console.log('---------------------');
  //
  // part2Test([], 0);
  // console.log('---------------------');
}