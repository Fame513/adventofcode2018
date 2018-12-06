import {getInput, getTestFunction} from './helper';

const DAY = 6;

tests();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });

function calculatePart1(input: { x: number, y: number }[]): number {
  let arrForCheck = [];
  const map = {};
  const count = {};
  let maxX = 0;
  let maxY = 0;
  for (const i in input) {
    if (input[i].x > maxX) {
      maxX = input[i].x;
    }

    if (input[i].y > maxY) {
      maxY = input[i].y;
    }
    map[cordToStr(input[i])] = i;
    arrForCheck.push(cordToStr(input[i]));
    count[i] = 1;
  }

  for (let z = 0; z < 1000; z++) {
    const arrCp = arrForCheck.slice();
    const newArr = [];
    for (const cord of arrCp) {
      const index = map[cord];
      if (index == -1) {
        continue;
      }
      const numbCord = strToCord(cord);
      const l = {x: numbCord.x - 1, y: numbCord.y};
      if (l.x >= 0 && l.x <= maxX && l.y >= 0 && l.y <= maxY) {
        if (checkPositions(l, map, arrCp, count, index)) {
          newArr.push(cordToStr(l));
        }
      }

      const r = {x: numbCord.x + 1, y: numbCord.y};
      if (r.x >= 0 && r.x <= maxX && r.y >= 0 && r.y <= maxY) {
        if (checkPositions(r, map, arrCp, count, index)) {
          newArr.push(cordToStr(r));
        }
      }
      const t = {x: numbCord.x, y: numbCord.y - 1};
      if (t.x >= 0 && t.x <= maxX && t.y >= 0 && t.y <= maxY) {
        if (checkPositions(t, map, arrCp, count, index)) {
          newArr.push(cordToStr(t));
        }
      }
      const b = {x: numbCord.x, y: numbCord.y + 1};
      if (b.x >= 0 && b.x <= maxX && b.y >= 0 && b.y <= maxY) {
        if (checkPositions(b, map, arrCp, count, index)) {
          newArr.push(cordToStr(b));
        }
      }
    }
    if (newArr.length === 0) {
      break;
    }
    arrForCheck = newArr;
  }

  console.log(count);
  console.log(map);
}

function checkPositions(point: { x: number, y: number }, map, arrForCheck: string[], count, index): boolean {

  if (!map[cordToStr(point)]) {
    map[cordToStr(point)] = index;
    count[index]++;
    return true;
  } else if (arrForCheck.indexOf(cordToStr(point)) >= 0) {
    const newIndex = map[cordToStr(point)];
    if (index != newIndex && newIndex != -1) {
      map[cordToStr(point)] = -1;
      count[newIndex]--;
    }
  }

}

function cordToStr(cord: { x: number, y: number }): string {
  return `${cord.x},${cord.y}`;
}

function strToCord(str: string): { x: number, y: number } {
  const spl = str.split(',');
  return {x: +spl[0], y: +spl[1]};
}

function calculatePart2(input) {

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
  const result2 = calculatePart2(parse(input));
  return [result1, result2];
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(parse(input)));
  // const part2Test = getTestFunction((input) => calculatePart2(parse(input)));
  part1Test(`1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`, 0);
  console.log('---------------------');

  // part2Test([], 0);
  console.log('---------------------');
}