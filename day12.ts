import {getInput, getTestFunction} from './helper';

const DAY = 12;

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input) {
  let zeroItem = 5;
  let state = '.....' + input[0] + '.....';
  const rules = input[1];
  for (let i = 0; i < 20; i++) {
    const newState = [];
    for (let s = 0; s < state.length - 5; s++) {
      const slice = state.slice(s, s + 5);
      const val = rules[slice] || '.';
      newState.push(val);
    }
    state = '.....' + newState.join('') + '.....';
    zeroItem += 3;
  }
  let result = 0;
  for (let i = 0; i < state.length; i++) {
    const char = state.charAt(i);
    const index = i - zeroItem;
    if (char === '#') {
      result += index;
    }
  }
  return getCount(state, zeroItem);
}

function calculatePart2(input) {
  let hunredVal = 0;
  let zeroItem = 5;
  let state = '.....' + input[0] + '.....';
  let prevCount = 0;
  let count = 0;
  const rules = input[1];
  for (let i = 0; i < 200; i++) {
    count = 0;
    const newState = [];
    for (let s = 0; s < state.length - 5; s++) {
      const slice = state.slice(s, s + 5);
      const val = rules[slice] || '.';
      if (val === '#') {
        count++;
      }
      newState.push(val);
    }
    state = '.....' + newState.join('') + '.....';
    zeroItem += 3;
    const val = getCount(state, zeroItem);
    if (i === 99) {
      hunredVal = val;
      const change = val - prevCount;
      return hunredVal + ((50000000000 - 100) * change)
    }
    prevCount = val;
  }
}

function getCount(state: string, offset: number): number {
  let result = 0;
  for (let i = 0; i < state.length; i++) {
    const char = state.charAt(i);
    const index = i - offset;
    if (char === '#') {
      result += index;
    }
  }
  return result;
}

function parse(input: string): [string, { [from: string]: string }] {
  let [initial, data] = input.split('\n\n');
  initial = initial.replace('initial state: ', '');
  const regexp = /(.{5}) => (.)/;
  const parsedData = {};
  data.split('\n')
    .map(row => row.match(regexp))
    .map(val => parsedData[val[1]] = val[2]);
  return [initial, parsedData];
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculatePart1(parse(input));
  const result2 = calculatePart2(parse(input));
  return [result1, result2];
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(parse(input)));
  const part2Test = getTestFunction((input) => calculatePart2(parse(input)));
  part1Test(`initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`, 325);
  console.log('---------------------');

  // part2Test([], 0);
  console.log('---------------------');
}

