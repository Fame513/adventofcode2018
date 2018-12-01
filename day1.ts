import {getInput, getTestFunction} from './helper';

const DAY = 1;

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: number[]) {
  return input.reduce((buf, value) => buf + value);
}

function calculatePart2(input: number[]) {
  const arr = [0];
  let value = 0;
  while (true) {
    for (const i of input) {
      value += i;
      if (arr.indexOf(value) >= 0) {
        return value;
      }
      arr.push(value)
    }
  }
}

function parse(input: string): number[] {
  return input.split('\n')
    .map(row => +row)
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculatePart1(parse(input));
  const result2 = calculatePart2(parse(input));
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(input));
  const part2Test = getTestFunction((input) => calculatePart2(input));
  part1Test([1, 1, 1], 3);
  part1Test([1, 1, -2], 0);
  part1Test([1, 1, -2], 0);

  console.log('---------------------');

  part2Test([+1, -1], 0);
  part2Test([+3, +3, +4, -2, -4], 10);
  part2Test([-6, +3, +8, +5, -6], 5);
  part2Test([+7, +7, -2, -7, -4], 14);
  console.log('---------------------');
}