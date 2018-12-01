import {getInput, getTestFunction} from './helper';

const DAY = 2;

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: any) {
  
}

function calculatePart2(input: any) {
 
}

function parse(input: string): number[][] {
  const regexp = /\d+/g;
  return input.split('\n')
    .map(row => row.match(regexp)
      .map(val => +val))
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
  console.log('---------------------');

  part2Test([+1, -1], 0);
  console.log('---------------------');
}