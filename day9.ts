import {getInput, getTestFunction} from './helper';

const DAY = 9;

class CircleList<T> {

  private n: CircleList<T>;
  private p: CircleList<T>;
  readonly v: T;

  next(count: number = 1): CircleList<T> {
    let v: CircleList<T> = this;
    for (let i = 0; i < count; i++) {
      v = v.n;
    }
    return v;
  }

  prev(count: number = 1): CircleList<T> {
    let v: CircleList<T> = this;
    for (let i = 0; i < count; i++) {
      v = v.p;
    }
    return v;
  }

  getValue(): T {
    return this.v;
  }

  insert(value: T): CircleList<T> {
    const newNode = new CircleList<T>(value, this, this.p);
    this.p.n = newNode;
    this.p = newNode;
    return newNode;
  }

  remove(): CircleList<T> {
    this.n.p = this.p;
    this.p.n = this.n;
    return this.n;
  }

  constructor(initValue: T, next?: CircleList<T>, prev?: CircleList<T>) {
    this.v = initValue;
    this.n = next || this;
    this.p = prev || this;
  }
}


tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});


function calculatePart1(input: {players: number, points: number}): number {
  const arr = [0];
  let point = 0;
  const score = new Array(input.players).fill(0);
  let currentPlayer = 0;
  
  for (let i = 1; i <= input.points; i++) {
    if (i % 23 !== 0) {
      point += 2;
      point %= arr.length;
      arr.splice(point, 0, i);
    } else {
      point -= 7;
      if (point < 0) {
        point += arr.length;
      }
      score[currentPlayer] += i + arr[point];
      arr.splice(point, 1);
    }
    currentPlayer++;
    currentPlayer %= input.players;
  }
  score.sort((a, b) => b - a);
  return score[0];
}

function calculatePart2(input) {
  let point: CircleList<number> = new CircleList<number>(0);
  const score = new Array(input.players).fill(0);
  let currentPlayer = 0;

  for (let i = 1; i <= input.points; i++) {
    if (i % 23 !== 0) {
      point = point.next(2);
      point = point.insert(i)
    } else {
      point = point.prev(7);
      score[currentPlayer] += i + point.getValue();
      point = point.remove()
    }
    currentPlayer++;
    currentPlayer %= input.players;
  }
  score.sort((a, b) => b - a);
  return score[0];
}

function parse(input: string): {players: number, points: number} {
  const regexp = /(\d+) players; last marble is worth (\d+) points/;
  const reg = input.match(regexp);
  return {players: +reg[1], points: +reg[2]}
}

export async function run() {
  const input: string = await getInput(DAY);
  const parsed = parse(input);
  const result1 = calculatePart2(parsed);
  const start = Date.now();
  const result2 = calculatePart2({players: parsed.players, points: parsed.points * 100});
  console.log('Second part timeout:', Date.now() - start);
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(parse(input)));
  const part2Test = getTestFunction((input) => calculatePart2(parse(input)));
  part1Test('9 players; last marble is worth 25 points', 32);
  part1Test('10 players; last marble is worth 1618 points', 8317);
  part1Test('13 players; last marble is worth 7999 points', 146373);
  part1Test('17 players; last marble is worth 1104 points', 2764);
  part1Test('21 players; last marble is worth 6111 points', 54718);
  part1Test('30 players; last marble is worth 5807 points', 37305);
  console.log('---------------------');

  part2Test('9 players; last marble is worth 25 points', 32);
  part2Test('10 players; last marble is worth 1618 points', 8317);
  part2Test('13 players; last marble is worth 7999 points', 146373);
  part2Test('17 players; last marble is worth 1104 points', 2764);
  part2Test('21 players; last marble is worth 6111 points', 54718);
  part2Test('30 players; last marble is worth 5807 points', 37305);
  console.log('---------------------');
}