import {getInput, getTestFunction} from './helper';

const DAY = 11;

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: number): string {
  const map = getGrid(input);
  
  let max = -Infinity;
  let result = '';
  for (let y = 0; y < 298; y++) {
    for (let x = 0; x < 298; x++) {
      const sum = map[y][x] +  map[y][x + 1] +  map[y][x + 2] +
        map[y + 1][x] +  map[y + 1][x + 1] +  map[y + 1][x + 2] +
        map[y + 2][x] +  map[y + 2][x + 1] +  map[y + 2][x + 2];
      if (sum > max) {
        max = sum;
        result = `${x+1},${y+1}`;
      }
    }
  }
  return result;
}

function calculatePart2(input) {
  const map = getGrid(input);
  let max = -Infinity;
  let result = '';
  for (let size = 0; size < 20; size++) {
    for (let y = 0; y < 300 - size; y++) {
      for (let x = 0; x < 300 - size; x++) {
          let sum = 0;
          for (let dy = 0; dy <= size; dy++) {
            for (let dx = 0; dx <= size; dx++) {
              sum += map[y + dy][x + dx];
            }
          }
        if (sum > max) {
          max = sum;
          result = `${x + 1},${y + 1},${size + 1}`;
        }
      }
    }
  }
  return result;
}

function getGrid(serial: number): number[][] {
  const map = [];
  for (let y = 1; y <= 300; y++) {
    const row = [];
    for (let x = 1; x <= 300; x++) {
      const rackId = x + 10;
      const power = rackId * y + serial;
      const mul = power * rackId;
      const hundreds = Math.floor(mul / 100) % 10;
      row.push(hundreds - 5);
    }
    map.push(row);
  }
  return map;
}

function parse(input: string): number {
  return +input;
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
  part1Test(18, '33,45');
  part1Test(42, '21,61');
  console.log('---------------------');

  part2Test(18, '90,269,16');
  part2Test(42, '232,251,12');
  console.log('---------------------');
}