import {getInput, getTestFunction} from './helper';

const DAY = 10;

type Point = {x: number, y: number};
type Star = {position: Point, velocity: Point}

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: Star[]): string {
  const arr = [];
  let time = calculatePart2(input);
  
  let xTo = 0;
  let xFrom = Infinity;
  let yTo = 0;
  let yFrom = Infinity;
  for (const inp of input) {
    const x = inp.position.x + inp.velocity.x * time;
    const y = inp.position.y + inp.velocity.y * time;
    if (x < xFrom) {xFrom = x;}
    if (x > xTo) {xTo = x;}
    if (y < yFrom) {yFrom = y;}
    if (y > yTo) {yTo = y;}
  }
 
  for (let y = 0; y <= yTo - yFrom; y++) {
    arr[y] = new Array(xTo - xFrom +1).fill('.');
  }
  for (const inp of input) {
    const x = inp.position.x + inp.velocity.x * time - xFrom;
    const y = inp.position.y + inp.velocity.y * time - yFrom;
    arr[y][x] = '*'
  }
  let result = ['\n'];
  for (const line of arr) {
    result.push(line.join(''));
  }
  return result.join('\n');
}

function calculatePart2(input) {
  let tDif = Infinity;

  for (let t = 0; ; t++) {
    let maxX = 0;
    let minX = Infinity;
    for (const inp of input) {
      const x = inp.position.x + inp.velocity.x * t;
      if (x < minX) {minX = x;}
      if (x > maxX) {maxX = x;}
    }
    const dif = maxX - minX;
    if (dif < tDif) {
      tDif = dif;
    } else {
      return t - 1;
    }
  }
}

function parse(input: string): Star[] {
  const regexp = /position=< ?(-?\d+),  ?(-?\d+)> velocity=< ?(-?\d+),  ?(-?\d+)>/;
  return input.split('\n')
    .map(row => row.match(regexp))
    .map(val => ({position: {x: +val[1], y: +val[2]}, velocity: {x: +val[3], y: +val[4]}}))
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
  part1Test(`position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>`, `

*...*..***
*...*...*.
*...*...*.
*****...*.
*...*...*.
*...*...*.
*...*...*.
*...*..***`);
  console.log('---------------------');

  part2Test(`position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>`, 3);
  console.log('---------------------');
}