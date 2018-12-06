import {getInput, getTestFunction} from './helper';

const DAY = 6;
type Point = { x: number, y: number }
tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: Point[]): number {
  const maxX = Math.max(...input.map(i => i.x));
  const maxY = Math.max(...input.map(i => i.y));
  const excludeSet = new Set<number>();
  const lengthes = new Array(input.length).fill(0);
  for (let y = 0; y <= maxY; y++) {
    // let s = '';
    for (let x = 0; x <= maxX; x++) {

      const point = getMinLength({x, y}, input);
      // s += ',' + ('00' + point).slice(-2);
      if (point >= 0) {
        lengthes[point]++;
      }
      if (x === 0 || y === 0 || x === maxX || y === maxY) {
        excludeSet.add(point);
      }
    }
    // console.log(s)
  }
  // console.log(lengthes);
  // console.log(excludeSet);
  return lengthes.filter((v, i) => !excludeSet.has(i)).sort((a, b) => b - a)[0];

}

function getMinLength(point: Point, points: Point[]): number {
  let minLength = Infinity;
  let minLengthIndex = -1;
  for (let i in points) {
    const length = getLength(points[i], point);
    if (length < minLength) {
      minLength = length;
      minLengthIndex = +i;
    } else if (minLength === length) {
      minLengthIndex = -1;
    }
  }
  return minLengthIndex;
}

function getLength(a: Point, b: Point): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function getTotalLength(point: Point, points: Point[]): number {
  let sum = 0;
  for (const p of points) {
    sum+= getLength(point, p);
  }
  
  return sum;
}

function calculatePart2(input, totalNeed) {
  const maxX = Math.max(...input.map(i => i.x));
  const maxY = Math.max(...input.map(i => i.y));
  let count = 0;
  for (let y = 0; y <= maxY; y++) {
    // let s = '';
    for (let x = 0; x <= maxX; x++) {

      const total = getTotalLength({x, y}, input);
      if (total < totalNeed) {
        count++;
      }
    }
  }
  return count;
}

function parse(input: string): { x: number, y: number }[] {
  const regexp = /(\d+), (\d+)/;
  return input.split('\n')
    .map(row => row.match(regexp))
    .map(val => ({x: +val[1], y: +val[2]}));
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculatePart1(parse(input));
  const result2 = calculatePart2(parse(input), 10000);
  return [result1, result2];
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(parse(input)));
  const part2Test = getTestFunction((input) => calculatePart2(parse(input), 32));
  part1Test(`1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`, 17);
  console.log('---------------------');

  part2Test(`1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`, 16);
  console.log('---------------------');
}