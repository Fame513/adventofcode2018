import {getInput, getTestFunction} from './helper';

const DAY = 3;

class Sq {
  index: number;
  xPos: number;
  yPos: number;
  width: number;
  height: number;

  constructor(index: number, xPos: number, yPos: number, width: number, height: number) {
    this.index = index;
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height
  }
}

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: Sq[]): number {
  const map = {};
  
  for (const sq of input) {
    for (let x = sq.xPos; x < sq.xPos + sq.width; x++) {
      for (let y = sq.yPos; y < sq.yPos + sq.height; y++) {
        const key = `${x},${y}`;
        if (map[key]) {
          map[key] = 'x'
        } else {
          map[key] = sq.index;
        }
      }
    }
  }
  
  let result = 0;
  for (const key in map) {
    if (map[key] === 'x') {
      result++
    }
  }
  
  return result;
}

function calculatePart2(input: Sq[]): number {
  const map = {};
  const overlapMap: {[index: number]: boolean} = {};
  for (const sq of input) {
    overlapMap[sq.index] = false;
    for (let x = sq.xPos; x < sq.xPos + sq.width; x++) {
      for (let y = sq.yPos; y < sq.yPos + sq.height; y++) {
        const key = `${x},${y}`;
        if (map[key]) {
          if (map[key] !== 'x') {
            overlapMap[map[key]] = true;
          }
          overlapMap[sq.index] = true;
          map[key] = 'x'
        } else {
          map[key] = sq.index;
        }
      }
    }
  }
  
  for (const key in overlapMap) {
    if (overlapMap[key] === false) {
      return +key;
    }
  }
}

function parse(input: string): Sq[] {
  const regexp = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
  return input.split('\n')
    .map(row => row.match(regexp))
    .map(val => new Sq(+val[1], +val[2], +val[3], +val[4], +val[5]))
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
  part1Test('#123 @ 3,2: 5x4', 0);
  part1Test(`#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`, 4);
  console.log('---------------------');

  part2Test(`#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`, 3);
  console.log('---------------------');
}

