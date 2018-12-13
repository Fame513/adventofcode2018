import {getInput, getTestFunction} from './helper';

const DAY = 13;

enum Direction {LEFT, UP, RIGHT, DOWN}
const TURN  = [-1, 0, 1];

const INIT_CATS_DIRECTIONS = {
  '<': Direction.LEFT,
  '>': Direction.RIGHT,
  'v': Direction.DOWN,
  '^': Direction.UP
};

const DIRECTION_OFFSET = {
  [Direction.LEFT]: {x: -1, y: 0},
  [Direction.RIGHT]: {x: 1, y: 0},
  [Direction.DOWN]: {x: 0, y: 1},
  [Direction.UP]: {x: 0, y: -1},
};

const TURN_MAP = {
  '/': {
    [Direction.LEFT]: Direction.DOWN,
    [Direction.DOWN]: Direction.LEFT,
    [Direction.RIGHT]: Direction.UP,
    [Direction.UP]: Direction.RIGHT
  },
  '\\': {
    [Direction.LEFT]: Direction.UP,
    [Direction.UP]: Direction.LEFT,
    [Direction.RIGHT]: Direction.DOWN,
    [Direction.DOWN]: Direction.RIGHT
  }
};

class Car {
  x: number;
  y: number;
  direction: Direction;
  turnCount: number = 0;
  
  constructor(x: number, y: number, direction: Direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
  
  getPos(): string {
    return `${this.x},${this.y}`;
  }
  
  move(input: string[][]): string {
    const offset = DIRECTION_OFFSET[this.direction];
    this.x += offset.x;
    this.y += offset.y;
    const tile = input[this.y][this.x];

    if (tile === '+') {
      this.direction = this.direction + TURN[this.turnCount % 3];
      this.direction = (this.direction  + 4) % 4;
      this.turnCount++;
    } else if (tile === '/' || tile === '\\') {
      this.direction = TURN_MAP[tile][this.direction];
    }
    
    return this.getPos();
  }
}
  


tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function getCars(input: string[][]): Car[] {
  const cars: Car[] = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (INIT_CATS_DIRECTIONS[input[y][x]] != undefined) {
        cars.push( new Car(x, y, INIT_CATS_DIRECTIONS[input[y][x]]));
      }
    }
  }
  return cars;
}

function calculatePart1(input: string[][]) {
  const cars: Car[] = getCars(input);
  while (true) {
    cars.sort((a, b) => a.y - b.y === 0 ? a.x - b.x : a.y - b.y);
    for (const car of cars) {
      car.move(input);
      
      const newPos = car.getPos();
      const carsAtPos = cars.filter(car => car.getPos() === newPos);
      if (carsAtPos.length > 1) {
        return newPos;
      }
    }
  }
}

function calculatePart2(input) {
  let cars: Car[] = getCars(input);
  
  while (true) {
    const crashedCars = [];
    cars.sort((a, b) => a.y - b.y === 0 ? a.x - b.x : a.y - b.y);
    for (const car of cars) {
      if (crashedCars.indexOf(car) < 0) {
        car.move(input);
        const newPos = car.getPos();
        const carsAtPos = cars.filter(car => car.getPos() === newPos);
        if (carsAtPos.length > 1) {
          crashedCars.push(...carsAtPos);
        }
      }
    }
    cars = cars.filter(car => crashedCars.indexOf(car) < 0);
    if (cars.length === 1) {
      return cars[0].getPos();
    }
  }
}

function parse(input: string): string[][] {
  return input.split('\n')
    .map(row => row.split(''))
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
  part1Test(`/->-\\        
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/   `, '7,3');
  console.log('---------------------');

  part2Test(`/>-<\\  
|   |  
| /<+-\\
| | | v
\\>+</ |
  |   ^
  \\<->/`, '6,4');
  console.log('---------------------');
}