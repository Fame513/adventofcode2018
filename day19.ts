import {getInput, getTestFunction} from './helper';

const DAY = 19;

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
    if (i > 6145452) {
      console.log(regs);
    }
    regs = methods[input[regs[ip]][0]](regs, input[regs[ip]])
    regs[ip]++;
  }

  console.log(i);

  return regs[0];
}

function calculatePart2(input, ip) {
  
  let regs = [1,0,0,0,0,0];
  // 0 GOTO 17
  regs[5] += 16; // addi 5 16 5                       
  // 1
  regs[3] = 1; // seti 1 7 3                                    
  // 2
  regs[1] = 1; // seti 1 4 1                                  
  // 3
  regs[4] = regs[3] * regs[1]; // mulr 3 1 4
  // 4
  regs[4] = regs[4] === regs[2] ? 1 : 0; // eqrr 4 2 4
  // 5 IF regs[4] === regs[2] GOTO 7
  regs[5] += regs[4]; // addr 4 5 5
  // 6
  regs[5]++; // addi 5 1 5
  // 7
  regs[0] += regs[3]; // addr 3 0 0
  // 8
  regs[1]++; // addi 1 1 1
  // 9
  regs[4] = regs[1] > regs[2] ? 1 : 0; // gtrr 1 2 4
  // 10 IF regs[1] > regs[2] GOTO 12
  regs[5] += regs[4]; // addr 5 4 5
  // 11 GOTO 3
  regs[5] = 2; // seti 2 1 5
  // 12
  regs[3]++; // addi 3 1 3
  // 13
  regs[4] = regs[3] > regs[2] ? 1 : 0; // gtrr 3 2 4
  // 14 IF regs[3] > regs[2] END
  regs[5] += regs[4]; // addr 4 5 5
  // 15 GOTO 2
  regs[5] = 1; // seti 1 4 5
  // 16 END
  regs[5] **= 2; // mulr 5 5 5
  {
    // // // 17
    // // regs[2] += 2; // addi 2 2 2
    // // // 18
    // // regs[2] **= 2; // mulr 2 2 2
    // // // 19
    // // regs[2] *= 19; // mulr 5 2 2
    // // // 20
    // // regs[2] *= 11; // muli 2 11 2
    // regs[2] = ((regs[2] + 2) ** 2) * 209;
    //
    // // // 21
    // // regs[4]++; // addi 4 1 4
    // // // 22
    // // regs[4] *= 22; // mulr 4 5 4
    // // // 23
    // // regs[4] += 19; // addi 4 19 4
    // regs[4] = (regs[4] + 1) * 22 + 19;
    // // 24
    // regs[2] += regs[4];  // addr 2 4 2
    regs[2] = (((regs[2] + 2) ** 2) * 209) + ((regs[4] + 1) * 22 + 19)
  }
  // 25 IF regs[0] === 1 GOTO 27
  regs[5] += regs[0]; // addr 5 0 5
  // 26 GOTO 1
  regs[5] = 0; // seti 0 9 5
  {
    // 27
    // regs[4] = 27; // setr 5 7 4
    // // 28
    // regs[4] *= 28; // mulr 4 5 4
    // // 29
    // regs[4] += 29; // addr 5 4 4
    // // 30
    // regs[4] *= 30; // mulr 5 4 4
    // // 31
    // regs[4] *= 14; // muli 4 14 4
    // // 32
    // regs[4] *= 32; // mulr 4 5 4
    regs[4] = ((27 * 28) + 29) * 30 * 14 * 32;
    // 33
    regs[2] += regs[4]; // addr 2 4 2
    // 34
    regs[0] = 0; // seti 0 9 0
  }
  // 35 GOTO 1
  regs[5] = 0; // seti 0 6 5
  
  
  let x = 1, a = 0, b = 0, c = 0;
  b = 877 + 10550400;
  c = 1;
  a = 1;
  if (a * c === b) {
    x += c
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
  const result1 = calculatePart1(parse(input), 5);
  const result2 = calculatePart2(parse(input), 5);
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(parse(input), 0));
  const part2Test = getTestFunction((input) => calculatePart2(parse(input), 0));
  part1Test([], 0);
  console.log('---------------------');

  part2Test([], 0);
  console.log('---------------------');
}