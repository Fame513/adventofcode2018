import {getInput, getTestFunction} from './helper';

const DAY = 7;
type Path = {from: string, to: string}
tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function getLetterTime(c: string, extra: number = 0): number {
  return c.charCodeAt(0) - 64 + extra;
}

function calculatePart1(input: Path[]): string {
  const map = new Map<string, string[]>();
  const bockedMap = new Map<string, string[]>();
  const toSet = new Set();
  for (const i of input) {
    if (!map.has(i.from)) {
      map.set(i.from, [i.to]);
    } else {
      map.get(i.from).push(i.to);
    }
    if (!bockedMap.has(i.to)) {
      bockedMap.set(i.to, [i.from]);
    } else {
      bockedMap.get(i.to).push(i.from);
    }
    toSet.add(i.to);
  }
  let firsts = [];
  for (const key of map.keys()) {
    if (!toSet.has(key)) {
      firsts.push(key);
    }
  }
  const queue = firsts;
  let result = '';
  
  while (queue.length) {
    queue.sort();
    const step = queue.shift();
    result += step;
    if (map.has(step)) {
      c: for (const m of map.get(step)) {
        if (queue.indexOf(m) >= 0) {
          continue;
        }
        const blocked = bockedMap.get(m);
        if (blocked) {
          for (const b of blocked) {
            if (result.indexOf(b) < 0) {
              continue c;
            }
          }
        }
        queue.push(m);
      }
    }
  }
  return result;
}

function calculatePart2(input, elvesCount: number = 2, extraTime: number = 0) {
  const map = new Map<string, string[]>();
  const bockedMap = new Map<string, string[]>();
  const toSet = new Set();
  for (const i of input) {
    if (!map.has(i.from)) {
      map.set(i.from, [i.to]);
    } else {
      map.get(i.from).push(i.to);
    }
    if (!bockedMap.has(i.to)) {
      bockedMap.set(i.to, [i.from]);
    } else {
      bockedMap.get(i.to).push(i.from);
    }
    toSet.add(i.to);
  }
  let firsts = [];
  for (const key of map.keys()) {
    if (!toSet.has(key)) {
      firsts.push(key);
    }
  }
  const queue = firsts;
  let result = '';
  
  let time = 0;
  const elves = [];
  for (let i = 0; i < elvesCount; i++) {
    elves.push({time: -1, letter: '', index: i})
  }
  while (true) {
    elves.sort((a, b) => a.index - b.index);
    // console.log(elves.map(e => `${e.letter}: ${e.time}`));
    elves.sort((a, b) => a.time - b.time);
    for (const elv of elves.filter(e => e.time <= time)) {
      if (elv.letter) {
        result += elv.letter;
        const step = elv.letter;
        elv.letter = '';
        if (map.has(step)) {
          c: for (const m of map.get(step)) {
            if (queue.indexOf(m) >= 0) {
              continue;
            }
            const blocked = bockedMap.get(m);
            if (blocked) {
              for (const b of blocked) {
                if (result.indexOf(b) < 0) {
                  continue c;
                }
              }
            }
            queue.push(m);
          }
        }
      }
    }
    queue.sort();

    for (const elv of elves.filter(e => !e.letter)) {
      const l = queue.shift();
      if (l) {
        elv.letter = l;
        elv.time = time + getLetterTime(l, extraTime);
      }
    }
    elves.sort((a, b) => a.time - b.time);
    const filter = elves.filter(e => e.time >= 0 && e.time > time && e.letter);
    if (filter.length) {
      // console.log(time);
      time = filter[0].time
    } else {
      return time;
    }
  }
}

function parse(input: string): Path[] {
  const regexp = /Step (.) must be finished before step (.) can begin\./;
  return input.split('\n')
    .map(row => row.match(regexp))
    .map(val => ({from: val[1], to: val[2]}))
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculatePart1(parse(input));
  const result2 = calculatePart2(parse(input), 5, 60);
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(parse(input)));
  const part2Test = getTestFunction((input) => calculatePart2(parse(input)));
  part1Test(`Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`, 'CABDFE');
  console.log('---------------------');

  part2Test(`Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`, 15);
  console.log('---------------------');
}