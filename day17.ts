import {getInput, getTestFunction} from './helper';

const DAY = 17;

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: {[cord: string]: string}, min: number, max: number) {
  // console.log(input);
  // console.log(min);
  // console.log(max);
  fillRow(input, 500, min, min, max);
  let result = 0;
  for (const coord in input) {
    if (input[coord] === '~' || input[coord] === '|') {
      result++
    }
  }
  
  const logArr = [];
  for (let y = min; y <= 15; y++) {
    const logRow = [];
    for (let x = 450; x < 550; x++) {
      logRow.push(input[coordToStr(x, y)] || '.')
    }
    logArr.push(logRow);
  }
  console.log(logArr.map(row => row.join('')).join('\n'));
  return result;
}

function fillRow(map: { [cord: string]: string }, xs: number, ys: number, min: number, max: number) {
  if (ys > max) {
    return true;
  }
  if (!map[coordToStr(xs, ys + 1)]) {
    fillRow(map, xs, ys + 1, min, max);
  }
   
  const bottom = map[coordToStr(xs, ys + 1)];
  if (bottom === '#' || bottom === '~') {
    const hasLeftWall = hasWall(map, xs, ys, -1, min, max);
    const hasRightWall = hasWall(map, xs, ys, 1, min, max);
    const fillVal = hasLeftWall && hasRightWall ? '~' : '|';
    let i = xs;
    while (map[coordToStr(i, ys)] !== '#') {
      map[coordToStr(i, ys)] = fillVal;
      if (!map[coordToStr(i, ys + 1)]) {
        fillRow(map, i, ys + 1, min, max);
        break;
      } else if( map[coordToStr(i, ys + 1)]=== '|') {
        break
      }
      i++;
    }
    i = xs;
    while (map[coordToStr(i, ys)] !== '#') {
      map[coordToStr(i, ys)] = fillVal;
      if (!map[coordToStr(i, ys + 1)]) {
        fillRow(map, i, ys + 1, min, max);
        break;
      } else if( map[coordToStr(i, ys + 1)]=== '|') {
        break
      }
      i--;
    }
  } else {
    map[coordToStr(xs, ys)] = '|'
  }
}

function hasWall(map: { [cord: string]: string }, x: number, y: number, direction: 1 | -1, min, max): boolean {
  if ( map[coordToStr(x, y)] === '#') {
    return true
  } else if (!map[coordToStr(x, y + 1)]) {
    fillRow(map, x, y + 1, min, max);
    return map[coordToStr(x, y + 1)] !== '|';
  } else {
    return hasWall(map, x + direction, y, direction, min, max);
  }
}

function calculatePart2(input: {[cord: string]: string}, min: number, max: number) {
  // console.log(input);
  // console.log(min);
  // console.log(max);
  fillRow(input, 500, min, min, max);
  let result = 0;
  for (const coord in input) {
    if (input[coord] === '~') {
      result++
    }
  }

  const logArr = [];
  for (let y = min; y <= 15; y++) {
    const logRow = [];
    for (let x = 450; x < 550; x++) {
      logRow.push(input[coordToStr(x, y)] || '.')
    }
    logArr.push(logRow);
  }
  console.log(logArr.map(row => row.join('')).join('\n'));
  return result;
}

function coordToStr(x: number, y: number): string {
  return `${x},${y}`;
}

function parse(input: string): [{[cord: string]: string}, number, number] {
  let result = {};
  const regexp = /([xy])=(\d+), ([xy])=(\d+)\.\.(\d+)/;
  let max = -Infinity;
  let min = Infinity;
  input.split('\n')
    .map(row => row.match(regexp))
    .forEach(val => {
      if (val[1] === 'y') {
        if (+val[2] > max) {
          max = +val[2]
        }
        if (+val[2] < min) {
          min = +val[2]
        }
      } else {
        if (+val[5] > max) {
          max = +val[5]
        }
        if (+val[4] < min) {
          min = +val[4]
        }
      }
      for (let i = +val[4]; i <= +val[5]; i++) {
        result[val[1] === 'x' ? coordToStr(+val[2], i) : coordToStr(i, +val[2])] = '#'
      }
    });
  return [result, min, max];
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculatePart1(...parse(input));
  const result2 = calculatePart2(...parse(input));
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(...parse(input)));
  const part2Test = getTestFunction((input) => calculatePart2(parse(input)));
  part1Test(`x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504`, 57);
  console.log('---------------------');

  // part2Test([], 0);
  console.log('---------------------');
}