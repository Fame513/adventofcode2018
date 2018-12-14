import {getInput, getTestFunction} from './helper';

const DAY = 14;

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: number): string {
  let e1 = 0;
  let e2 = 1;
  const arr = [3, 7];
  while (arr.length < input + 10) {
    const score = arr[e1] + arr[e2];
    const digits = breakToDigits(score);
    arr.push(...digits);
    e1 = (e1 + arr[e1] + 1) % arr.length;
    e2 = (e2 + arr[e2] + 1) % arr.length;
  }
  return arr.slice(input, input + 10).join('');
}

function breakToDigits(value: number): number[] {
  return value.toString().split('').map(v => +v);
}

function calculatePart2(input: string): number {
  let e1 = 0;
  let e2 = 1;
  const arr = [3, 7];
  while (true) {
    const score = arr[e1] + arr[e2];
    const digits = breakToDigits(score);
    arr.push(...digits);
    e1 = (e1 + arr[e1] + 1) % arr.length;
    e2 = (e2 + arr[e2] + 1) % arr.length;
    const last = arr.slice(-10).join('');
    if (last.indexOf(input) >= 0) {
      return arr.length - 10 + last.indexOf(input);
    }
  }
}

function parse(input: string): number {
  return +input;
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculatePart1(parse(input));
  const result2 = calculatePart2(input);
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(parse(input)));
  const part2Test = getTestFunction((input) => calculatePart2(input));
  part1Test(9, '5158916779');
  part1Test(5, '0124515891');
  part1Test(18, '9251071085');
  part1Test(2018, '5941429882');
  console.log('---------------------');

  part2Test('51589', 9);
  part2Test('01245', 5);
  part2Test('92510', 18);
  part2Test('59414', 2018);
  console.log('---------------------');
}