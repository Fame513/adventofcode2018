import {getInput, getTestFunction} from './helper';

const DAY = 23;

tests();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });

function distance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
}

function calculatePart1(input) {
  input.sort((a, b) => b.r - a.r);
  const strong = input[0];
  let result = 0;
  for (const bot of input) {
    if (distance(bot, strong) <= strong.r) {
      result++;
    }
  }
  return result;
}

function getMaxCross(map: {[index: string]: string[]}, arr: string[]): string[] {
  let best = [];
  for (const val of arr) {
    const res = getMaxCross(map, map[val].filter(v => v != val && arr.indexOf(v) >= 0));
    if (res.length + 1 > best.length) {
      res.push(val);
      best = res;
    }
  }
  return best
}

function calculatePart2(input) {
  const cross: {[index: string]: string[]} = {};
  const arr = [];
  for (const a in input) {
    arr.push(a);
    cross[a] = [];
    for (const b in input) {
      if (distance(input[a], input[b]) <= input[a].r + input[b].r) {
        cross[a].push(b);
      }
    }
  }
  const crossBots = getMaxCross(cross, arr);
  console.log(crossBots);

  // while (input.length) {
  //   let big;
  //   let max = 0;
  //   for (const key in cross) {
  //     const keyCount = Object.keys(cross[key]).length;
  //     if (keyCount > max) {
  //       max = keyCount;
  //       big = key
  //     }
  //   }
  //   crossBots.push(input[+big]);
  //   input = input.filter((v, i) => cross[big][i.toString()] && +big !== i);
  // }
  // let min = Infinity;
  // let a1, b1;
  let bx = 0, by = 0, bz = 0;
  for (const a in input) {
    bx += input[a].x;
    by += input[a].y;
    bz += input[a].z;
    // for (const b in input) {
    //   const dist = (input[a].r + input[b].r) - distance(input[a], input[b]);
    //   if ( dist < min) {
    //     min = dist;
    //     a1 = a;
    //     b1 = b;
    //   }
    // }
  }
  bx = Math.floor(bx / input.length);
  by = Math.floor(by / input.length);
  bz = Math.floor(bz / input.length);
  console.log(bx, by, bz);
 
  const crossSphere = [];
  for (const bot of input) {
    if (distance(bot, {x: bx, y: by, z: bz}) <= bot.r) {
      crossSphere.push(bot);
    }
  }
  let max = 0;
  let sp;
  for (const bot of crossSphere) {
    const dist = distance(bot, {x: 0, y: 0, z: 0}) - bot.r
    if  (dist > max) {
      max = dist;
      sp = bot;
    }
  }
  console.log(crossSphere.length);
  console.log(sp);
  // console.log(input[+a1], input[+b1], distance(input[+a1], input[+b1]), input[+a1].r + input[+b1].r);
}

function parse(input: string): { x: number, y: number, z: number, r: number }[] {
  const regexp = /pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)/;
  return input.split('\n')
    .map(row => row.match(regexp))
    .map(val => ({x: +val[1], y: +val[2], z: +val[3], r: +val[4]}));
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
  part1Test(`pos=<0,0,0>, r=4
pos=<1,0,0>, r=1
pos=<4,0,0>, r=3
pos=<0,2,0>, r=1
pos=<0,5,0>, r=3
pos=<0,0,3>, r=1
pos=<1,1,1>, r=1
pos=<1,1,2>, r=1
pos=<1,3,1>, r=1`, 7);
  console.log('---------------------');

  part2Test(`pos=<10,12,12>, r=2
pos=<12,14,12>, r=2
pos=<16,12,12>, r=4
pos=<14,14,14>, r=6
pos=<50,50,50>, r=200
pos=<10,10,10>, r=5`, '12,12,12');
  console.log('---------------------');
}