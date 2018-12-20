import {getInput, getTestFunction} from './helper';

const DAY = 20;

// tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input) {
  const size = 200;
  const map: string[][] = [];
  for (let y = 0; y < size * 2; y++) {
    const row = (y % 2 ? '? '.repeat(size) : '#?'.repeat(size)).split('');
    map.push(row);
  }
  
  drowPath(input, map, size + 1, size + 1, 1);
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '?' || map[y][x] === ' ') {
        map[y][x] = '#';
      }
    }
  }
  map[size + 1][size + 1] = 'X';
  
  console.log(map.map(row => row.join('')).join('\n'));
  
}

function drowPath(input: string, map: string[][], xs: number, ys: number, i:number) {
  let x = xs, y = ys;
  while (true) {
    map[y][x] = '.';
    if (input.charAt(i) === '$') {
      return;
    }

    if (input.charAt(i) === ')') {
      return i ;
    }
    if (input.charAt(i) === '(') {
      i = drowPath(input, map, x, y, i + 1);
      if (!i) {
        return;
      } else {
        i++;
        continue;
      }
    }
    if (input.charAt(i) === '|') {
      x = xs;
      y = ys;
    }

    if (input.charAt(i) === 'N') {
      map[y - 1][x] = '-';
      y -= 2;
    }

    if (input.charAt(i) === 'S') {
      map[y + 1][x] = '-';
      y += 2;
    }
    
    if (input.charAt(i) === 'W') {
      map[y][x - 1] = '|';
      x -= 2;
    }

    if (input.charAt(i) === 'E') {
      map[y][x + 1] = '|';
      x += 2;
    }

    map[y][x] = '.';
    i++;
  }
}

function calculatePart2(input) {

}


export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculatePart1(input);
  const result2 = calculatePart2(input);
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(input));
  const part2Test = getTestFunction((input) => calculatePart2(input));
  part1Test('^WNE$', 3);
  part1Test('^ENWWW(NEEE|SSE(EE|N))$', 10);
  part1Test('^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$', 18);
  part1Test('^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$', 23);
  part1Test('^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$', 31);
  console.log('---------------------');

  // part2Test([], 0);
  console.log('---------------------');
}