import {getInput, getTestFunction} from './helper';

const DAY = 18;

// tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: string[][]) {
  for (let i = 0; i < 10; i++) {
    const newInput = [];
    for (let y = 0; y < input.length; y++) {
      const newRow = [];
      for (let x = 0; x < input.length; x++) {
        const newValue = calculate(input, x, y);
        newRow.push(newValue);
      }
      newInput.push(newRow)
    }
    console.log(i + 1);
    console.log(newInput.map(row => row.join('')).join('\n'));
    input = newInput;
  }

  let trees = 0;
  let lumberyard = 0;
  
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input.length; x++) {
      if (input[y][x] === '|') {
        trees++
      }
      if (input[y][x] === '#') {
        lumberyard++
      } 
    }
  }
  return trees * lumberyard;
}

function calculate(input: string[][], x: number, y: number) {
  const currVal = input[y][x];
  const count = {'.': 0, '|': 0, '#': 0};
  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      if (!input[i] || !input[i][j] || (i === y && j === x)) {
        continue;
      }
      count[input[i][j]]++;
    }
  }
  
  if (currVal === '.' && count['|'] >= 3) {
    return '|'
  }
  if (currVal === '|' && count['#'] >= 3) {
    return '#'
  }
  if (currVal === '#' && (count['#'] < 1 || count['|'] < 1)) {
    return '.'
  }
  return currVal;
}

function calculatePart2(input) {
  let trees = 0;
  let lumberyard = 0;
  for (let i = 0; i < 1000; i++) {
    trees = 0;
    lumberyard = 0;
    const newInput = [];
    for (let y = 0; y < input.length; y++) {
      const newRow = [];
      for (let x = 0; x < input.length; x++) {
        const newValue = calculate(input, x, y);
        if (newValue === '|') {
          trees++
        }
        if (newValue === '#') {
          lumberyard++
        }
        newRow.push(newValue);
      }
      newInput.push(newRow)
    }
    console.log(i + 1, trees * lumberyard);
    // console.log(trees * lumberyard);
    // console.log(newInput.map(row => row.join('')).join('\n'));
    input = newInput;
  }
  
  return trees * lumberyard;
}

function parse(input: string): string[][] {
  const regexp = /\d+/;
  return input.split('\n')
    .map(row => row.split(''))
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
  part1Test(`.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.`, 1147);
  console.log('---------------------');

  // part2Test([], 0);
  console.log('---------------------');
}