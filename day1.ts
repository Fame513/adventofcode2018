import {getInput, getTestFunction} from './helper';

const DAY = 1;

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculate(input: string) {
  let result = 0;

  return result;
}

function parse(input: string): number[][] {
  const regexp = /\d+/g;
  return input.split('\n')
    .map(row => row.match(regexp)
      .map(val => +val))
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculate(input);
  const result2 = calculate(input);
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculate(input));
  const part2Test = getTestFunction((input) => calculate(input));
  // part1Test('1122', 3);

  console.log('---------------------');

  // part2Test('1212', 6);

  console.log('---------------------');

}