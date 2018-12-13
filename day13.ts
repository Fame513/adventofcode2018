import {getInput, getTestFunction} from './helper';

const DAY = 13;

enum Direction {LEFT, UP, RIGHT, DOWN}
enum Turn {
  LEFT = -1,
  STRAIGHT = 0,
  RIGHT = 1
}

class Car {
  x: number;
  y: number;
  direction: Direction;
  nextTurn: Turn = Turn.LEFT;
  
  constructor(x: number, y: number, direction: Direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
  
  getPos(): string {
    return `${this.x},${this.y}`;
  }
  
  move(next: string): string {
    if (this.direction === Direction.LEFT) {
      this.x--;
    } else if(this.direction === Direction.RIGHT) {
      this.x++;
    } else if(this.direction === Direction.UP) {
      this.y--;
    } else if(this.direction === Direction.DOWN) {
      this.y++;
    }
    
    if (next === '+') {
      this.direction += this.nextTurn + 4;
      this.direction %= 4;
      this.nextTurn++;
      if (this.nextTurn > 1) {
        this.nextTurn = -1;
      }
    } else if (next === '/') {
      if (this.direction === Direction.LEFT) {
        this.direction = Direction.DOWN;
      } else if (this.direction === Direction.RIGHT) {
        this.direction = Direction.UP;
      } else if (this.direction === Direction.UP) {
        this.direction = Direction.RIGHT;
      } else if (this.direction === Direction.DOWN) {
        this.direction = Direction.LEFT;
      }
    } else if (next === '\\') {
      if (this.direction === Direction.LEFT) {
        this.direction = Direction.UP;
      } else if (this.direction === Direction.RIGHT) {
        this.direction = Direction.DOWN;
      } else if (this.direction === Direction.UP) {
        this.direction = Direction.LEFT;
      } else if (this.direction === Direction.DOWN) {
        this.direction = Direction.RIGHT;
      }
    }
    
    return this.getPos();
  }
}
  


// tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: string[][]) {
  const cars: Car[] = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === '<') {
        const newCar = new Car(x, y, Direction.LEFT);
        cars.push(newCar);
        input[y][x] = '-'
      } else if (input[y][x] === '>') {
        const newCar = new Car(x, y, Direction.RIGHT);
        cars.push(newCar);
        input[y][x] = '-'
      } else if (input[y][x] === 'v') {
        const newCar = new Car(x, y, Direction.DOWN);
        cars.push(newCar);
        input[y][x] = '|';
      } else if (input[y][x] === '^') {
        const newCar = new Car(x, y, Direction.UP);
        cars.push(newCar);
        input[y][x] = '|';
      }
    }
  }
  
  while (true) {
    cars.sort((a, b) => a.y - b.y === 0 ? a.x - b.x : a.y - b.y);
    for (const car of cars) {
      if (car.direction === Direction.UP) {
        car.move(input[car.y - 1][car.x]);
      } else if (car.direction === Direction.DOWN) {
        car.move(input[car.y + 1][car.x]);
      } else if (car.direction === Direction.LEFT) {
        car.move(input[car.y][car.x - 1]);
      } else if (car.direction === Direction.RIGHT) {
        car.move(input[car.y][car.x + 1]);
      }
      
      const newPos = car.getPos();
      const carsAtPos = cars.filter(car => car.getPos() === newPos);
      if (carsAtPos.length > 1) {
        return newPos;
      }
    }
  }
}

function calculatePart2(input) {
  const cars: Car[] = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === '<') {
        const newCar = new Car(x, y, Direction.LEFT);
        cars.push(newCar);
        input[y][x] = '-'
      } else if (input[y][x] === '>') {
        const newCar = new Car(x, y, Direction.RIGHT);
        cars.push(newCar);
        input[y][x] = '-'
      } else if (input[y][x] === 'v') {
        const newCar = new Car(x, y, Direction.DOWN);
        cars.push(newCar);
        input[y][x] = '|';
      } else if (input[y][x] === '^') {
        const newCar = new Car(x, y, Direction.UP);
        cars.push(newCar);
        input[y][x] = '|';
      }
    }
  }
  const crashedCars = [];
  while (true) {
    cars.sort((a, b) => a.y - b.y === 0 ? a.x - b.x : a.y - b.y);
    for (const car of cars) {
      if (crashedCars.indexOf(car) >= 0) {
        continue;
      }
      if (car.direction === Direction.UP) {
        car.move(input[car.y - 1][car.x]);
      } else if (car.direction === Direction.DOWN) {
        car.move(input[car.y + 1][car.x]);
      } else if (car.direction === Direction.LEFT) {
        car.move(input[car.y][car.x - 1]);
      } else if (car.direction === Direction.RIGHT) {
        car.move(input[car.y][car.x + 1]);
      }

      const newPos = car.getPos();
      const carsAtPos = cars.filter(car => car.getPos() === newPos && crashedCars.indexOf(car) < 0);
      if (carsAtPos.length > 1) {
        crashedCars.push(...carsAtPos);
      }
    }
    if (cars.length - crashedCars.length === 1) {
      return cars.find(car => crashedCars.indexOf(car) < 0).getPos();
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