import {getInput, getTestFunction} from './helper';

const DAY = 22;

const BothMap = {
  '0,1': 'c',
  '1,0': 'c',
  '0,2': 't',
  '2,0': 't',
  '1,2': 'n',
  '2,1': 'n'
};

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(xTarget, yTarget, depth) {
  let result = 0;
  const riskMap = {};
  for(let y = 0; y <= yTarget; y++) {
    for(let x = 0; x <= xTarget; x++) {
      result += (getRisk(x, y, riskMap, depth, xTarget, yTarget) % 3)
    }
  }
  
  return result;
}

function cd(x, y) {
  return `${x},${y}`;
}

function getRisk(x, y, riskMap, depth, xTarget, yTarget) {
  if (riskMap[cd(x, y)]) {
    return riskMap[cd(x, y)];
  }
  const modulo = 20183;
  const xTimes = 16807;
  const yTimes = 48271;
  let risk;
  if (x === 0 && y === 0) {
    risk = depth % modulo;
  } else if (x === xTarget && y === yTarget) {
      risk = depth % modulo;
  } else if (y === 0) {
    risk = ((x * xTimes) + depth) % modulo
  } else if (x === 0) {
    risk = ((y * yTimes) + depth) % modulo
  } else {
    risk = ((getRisk(x - 1, y, riskMap, depth, xTarget, yTarget) * getRisk(x, y - 1, riskMap, depth, xTarget, yTarget)) + depth) % modulo;
  }
  
  riskMap[cd(x, y)] = risk;
  return risk;
}


function calculatePart2(xTarget, yTarget, depth) {
  const extraSize = 30;
  const xMax = xTarget + extraSize;
  const yMax = yTarget + extraSize;
  const riskMap = {};
  const moves = [
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: 1},
    {x: 0, y: -1},
  ];

  
  let map = {};
  for(let y = 0; y <= yMax; y++) {
    for(let x = 0; x <= xMax; x++) {
      map[cd(x, y)] = (getRisk(x, y, riskMap, depth, xTarget, yTarget)) % 3
    }
  }
  
  const lengthMap = {};
  lengthMap[cd(0,0)] = {t: 0, c: null, n: null};
  
  const queue  = [];
  queue.push({x: 0, y: 0, t: 0, h: 't'});
  

  while (queue.length) {
    queue.sort((a, b) => a.t - b.t);
    const path = queue.shift();
    const c = map[cd(path.x, path.y)];
    
    for (const move of moves) {
      const x =  path.x + move.x;
      const y =  path.y + move.y;
      if (y < 0 || x < 0 || x > xMax || y > yMax) {
        continue;
      }

      const h = BothMap[`${c},${map[cd(x, y)]}`] || path.h;
      const t = path.t + (h != path.h ? 8 : 1);
      const lm = lengthMap[cd(x, y)] || {};
      if (lm[h] == null || lm[h] > t) {
        lm[h] = t;
        lengthMap[cd(x, y)] = lm;
        queue.push({x, y, t, h})
      }
    }
  }

  const lm = lengthMap[cd(xTarget, yTarget)];
  return Math.min(lm.t || Infinity, lm.c ? lm.c + 7 : Infinity, lm.n ? lm.n + 7 : Infinity)
}

function parse(input: string): number[] {
  const regexp = /\d+/;
  return input.split('\n')
    .map(row => row.match(regexp))
    .map(val => +val)
}

export async function run() {
  // const input: string = await getInput(DAY);
  const result1 = calculatePart1(15, 700, 4848);
  const result2 = calculatePart2(15, 700, 4848);
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(10, 10, 510));
  const part2Test = getTestFunction((input) => calculatePart2(10, 10, 510));
  part1Test([], 114);
  console.log('---------------------');

  part2Test([], 45);
  console.log('---------------------');
}