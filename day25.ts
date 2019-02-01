import {getInput, getTestFunction} from './helper';

const DAY = 25;

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
});

function getDistanse(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) + Math.abs(a[3] - b[3])
}

function calculatePart1(input: number[][]) {
  const connections = {};
  for(let a = 0; a < input.length; a++) {
    connections[a] = [];
    for(let b = 0; b < input.length; b++) {
      const dist = getDistanse(input[a], input[b]);
      if (dist <= 3) {
        connections[a].push(b);
      }
    }    
  }
  const constellations = [];
  while (+Object.keys(connections).length) {
    const res = [];
    const sub = findCnnections(+Object.keys(connections)[0], connections, res);
    for (const r of sub) {
      delete connections[r];
    }
    constellations.push(sub);
  }
  return constellations.length;
}

function findCnnections(key: number, connections, result: number[]) {
  if (!connections[key]) {
    return [];
  }
  for (const i of connections[key]) {
    if (result.indexOf(+i) < 0) {
      result.push(+i);
      findCnnections(+i, connections, result);
    }
  }
  return result;
}

function parse(input: string): number[][] {
  const regexp = /(-?\d+),(-?\d+),(-?\d+),(-?\d+)/;
  return input.split('\n')
    .map(row => row.match(regexp))
    .map(val => [+val[1], +val[2], +val[3], +val[4]])
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculatePart1(parse(input));
  return [result1]
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(parse(input)));
  part1Test(`0,0,0,0
 3,0,0,0
 0,3,0,0
 0,0,3,0
 0,0,0,3
 0,0,0,6
 9,0,0,0
12,0,0,0`, 2);
  part1Test(`-1,2,2,0
0,0,2,-2
0,0,0,-2
-1,2,0,0
-2,-2,-2,2
3,0,2,-1
-1,3,2,2
-1,0,-1,0
0,2,1,-2
3,0,0,0`, 4);
  part1Test(`1,-1,0,1
2,0,-1,0
3,2,-1,0
0,0,3,1
0,0,-1,-1
2,3,-2,0
-2,2,0,0
2,-2,0,-1
1,-1,0,-1
3,2,0,2`, 3);
  part1Test(`1,-1,-1,-2
-2,-2,0,1
0,2,1,3
-2,3,-2,1
0,2,3,-2
-1,-1,1,-2
0,-2,-1,0
-2,2,3,-1
1,2,2,0
-1,-2,0,-2`, 8);
  console.log('---------------------');
}