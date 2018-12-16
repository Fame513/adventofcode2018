import {getInput, getTestFunction} from './helper';

const DAY = 15;

const MOVES = [
  {x: 0, y: -1},
  {x: -1, y: 0},
  {x: 1, y: 0},
  {x: 0, y: 1},
];


class Unit {
  x: number;
  y: number;
  health: number = 200;
  power: number = 3;
  type: 'E' | 'G';
  constructor(x: number, y: number, type: 'E' | 'G') {
    this.x = x;
    this.y = y;
    this.type = type;
  }
  
  toString() {
    return this.type;  
  }
  
  move(map: (string | Unit)[][]): boolean {
    if (this.health <= 0) {
      map[this.y][this.x] = '.';
      return false;
    }
    // console.log(map.map(row => row.join('')).join('\n'));

    const nearest = this.findNearestEnemy(map);
    if (!nearest) {
      return false;
    } 
    const u = map[nearest.y][nearest.x];
    if (typeof u === 'string') {
      map[this.y][this.x] = '.';
      this.x = nearest.x;
      this.y = nearest.y;
      map[this.y][this.x] = this;
    }

    const nearest2 = this.findNearestEnemy(map);
    if (!nearest) {
      return false;
    }
    const u2 = map[nearest2.y][nearest2.x];
    if (typeof u2 !== 'string') {
      // console.log(this.type, 'hit', u2.type);
      u2.health -= this.power;
      if (u2.health <= 0) {
        map[u2.y][u2.x] = '.'
      }
    } 
    
    return true;
    
  }
  
  findNearestEnemy(map:(string | Unit)[][]): {x: number, y: number} {
    const nearest: Unit[] = [];
    for (const move of MOVES) {
      const u = map[this.y + move.y][this.x + move.x];
      if (typeof u !== 'string' && u.type !== this.type) {
        nearest.push(u);
      } 
    }
    if (nearest.length) {
      nearest.sort((a, b) => a.health - b.health);
      const lowest = nearest.filter(v => v.health === nearest[0].health)
      lowest.sort((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y);
      return {x: lowest[0].x, y: lowest[0].y};
    }
    
    const path = [];
    const visitedMap: {[pos: string]: boolean} = {};
    for (const move of MOVES) {
      const u = map[this.y + move.y][this.x + move.x];
      if (typeof u === 'string' && u === '.') {
        path.push({x: this.x + move.x, y: this.y + move.y, from: {x: this.x + move.x, y: this.y + move.y}, length: 1});
        visitedMap[coordToString(this.x + move.x, this.y + move.y)] = true;
      }
    }
    let nearestLength = 0;
    const enemies = [];
    while (path.length) {
      const p = path.shift();
      if (nearestLength && p.length > nearestLength) {
        break;
      }
      for (const move of MOVES) {
        const strCord = coordToString( p.x + move.x, p.y + move.y);
        if (visitedMap[strCord]) {
          continue;
        }
        const u = map[p.y + move.y][p.x + move.x];
        if (typeof u === 'string' && u === '.') {
          path.push({x: p.x + move.x, y: p.y + move.y, from: p.from, length: p.length + 1});
          visitedMap[strCord] = true;
        } else if (typeof u !== 'string' && u.type !== this.type) {
          enemies.push({x: u.x, y: u.y, from: p.from});
          if (!nearestLength) {
            nearestLength = p.length;
          }
        }
      }
    }
    if (enemies.length) {
      enemies.sort((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y);
      return enemies[0].from;
    }
    
  }
}

function coordToString(x: number, y: number): string {
  return `${x},${y}`
} 

tests();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });

function calculatePart1(input: (string | Unit)[][]) {
  let hasMove = true;
  let moveCount = 0;
  console.log(moveCount);
  console.log(input.map(row => row.join('')).join('\n'));
  while (hasMove) {
    moveCount++;
    hasMove = false;
    const moved: Unit[] = [];
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        const u = input[y][x];
        if (typeof u !== 'string') {
          moved.push(u);
        }
      }
    }
    for (const unit of moved) {
      const wasMoves = unit.move(input);
      if (wasMoves) {
        hasMove = true;
      }
    }
    for (const unit of moved) {
      if (unit.type === 'E') {
        // console.log('E health', unit.health);
      }
    }
    // console.log(moveCount);
    // console.log(input.map(row => row.join('')).join('\n'));
  }
  let score = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const u = input[y][x];
      if (typeof u !== 'string') {
        score += u.health;
        console.log(u.health);
      }
    }
  }
  console.log('score', score);
  console.log('moveCount', moveCount);
  
  return score * (moveCount - 2);
}

function calculatePart2(input) {

}

function parse(input: string): [][] {
  const map = [];
  for(const row of input.split('\n')) {
    const newRow = [];
    for(const u of row.split('')) {
      if (u  === 'E' || u === 'G') {
        newRow.push(new Unit(newRow.length, map.length, u))
      } else {
        newRow.push(u);
      }
    }
    map.push(newRow);
  }
  return map;
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
  part1Test(`#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######`, 27730);
  part1Test(`#######
#G..#E#
#E#E.E#
#G.##.#
#...#E#
#...E.#
#######`, 36334);

  part1Test(`#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`, 39514);

  part1Test(`#######
#E.G#.#
#.#G..#
#G.#.G#
#G..#.#
#...E.#
#######`, 27755);

  part1Test(`#######
#.E...#
#.#..G#
#.###.#
#E#G#G#
#...#G#
#######`, 28944);

  part1Test(`#########
#G......#
#.E.#...#
#..##..G#
#...##..#
#...#...#
#.G...G.#
#.....G.#
#########`, 18740);
  
}