import {getInput, getTestFunction} from './helper';

const DAY = 5;

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function react(input: string): string {
  let arr = input.split('');
  let i = 0;
    while (i < arr.length - 1) {
      if (Math.abs(arr[i].charCodeAt(0) - arr[i + 1].charCodeAt(0)) === 32) {
        arr.splice(i, 2);
        i = i === 0 ? 0 : i - 1;
      } else {
        i++
      }
  }
  return arr.join('');
}

function calculatePart1(input: string) {
  const result = react(input);
  return result.length;
}

function calculatePart2(input) {
  const alph = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const firstReact = react(input);
  let min = Infinity;
  for (const leter of alph) {
    const str = firstReact.replace(RegExp(`${leter}`, 'gi'), '');
    const react2 = react(str);
    const length = react2.length;
    if (length < min) {
      min = length;
    }
  }
  return min;
}

function parse(input: string): number[] {
  const regexp = /\d+/g;
  return input.split('\n')
    .map(row => row.match(regexp))
    .map(val => +val)
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculatePart1(input);
  const result2 = calculatePart2(input);
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(input));
  const part2Test = getTestFunction((input) => calculatePart2(input));
  part1Test('dabAcCaCBAcCcaDA', 10);
  console.log('---------------------');

  part2Test('dabAcCaCBAcCcaDA', 4);
  console.log('---------------------');
}