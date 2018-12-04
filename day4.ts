import {getInput, getTestFunction} from './helper';

const DAY = 4;

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: {date: Date, action: string | number}[]) {
  input.sort((a, b) => +a.date - +b.date);
  let guard;
  const calendar = {};
  for(const rec of input) {
    if (typeof rec.action === 'number') {
      guard = rec.action;
    } else if (guard) {
      if (!calendar[guard]) {
        calendar[guard] = [];
      }
      if (rec.action === 'falls asleep') {
        calendar[guard].push({start: rec.date, stop: 0})
      } else if (rec.action === 'wakes up') {
        calendar[guard][calendar[guard].length - 1].stop = rec.date;
      }
    }
  }
  
  const totalminutes ={};
  for (const guardNum in calendar) {
    for(const rec of calendar[guardNum]) {
      if (!totalminutes[guardNum]) {
        totalminutes[guardNum] = 0
      }
      totalminutes[guardNum] += rec.stop.getMinutes() - rec.start.getMinutes()
    }
  }
  let theGuard;
  let max = 0;
  for (const guarIndex in totalminutes) {
    if (totalminutes[guarIndex] > max) {
      theGuard = guarIndex;
      max = totalminutes[guarIndex];
    }
  }
  
  const minutes = new Array(60).fill(0);
  
  for (const rec of calendar[theGuard]) {
    const start = rec.start.getMinutes();
    const stop = rec.stop.getMinutes();
    for (let i = start; i < stop; i++ ) {
      minutes[i] += 1;
    }
  }
  const maxTime = Math.max(...minutes);
  const maxMin = minutes.indexOf(maxTime);
  return maxMin * theGuard
}

function calculatePart2(input) {
  input.sort((a, b) => +a.date - +b.date);
  let guard;
  const calendar = {};
  for(const rec of input) {
    if (typeof rec.action === 'number') {
      guard = rec.action;
    } else if (guard) {
      if (!calendar[guard]) {
        calendar[guard] = [];
      }
      if (rec.action === 'falls asleep') {
        calendar[guard].push({start: rec.date, stop: 0})
      } else if (rec.action === 'wakes up') {
        calendar[guard][calendar[guard].length - 1].stop = rec.date;
      }
    }
  }
  
  const totalminutes ={};
  for (const guardNum in calendar) {
    for(const rec of calendar[guardNum]) {
      if (!totalminutes[guardNum]) {
        totalminutes[guardNum] = new Array(60).fill(0);
      }
      const start = rec.start.getMinutes();
      const stop = rec.stop.getMinutes();
      for (let i = start; i < stop; i++ ) {
        totalminutes[guardNum][i] += 1;
      }
    }
  }
  let theGuard;
  let max = 0;
  let minute = 0;
  for (const guarIndex in totalminutes) {
    for (const m in totalminutes[guarIndex]) {
      if (totalminutes[guarIndex][m] > max) {
        max = totalminutes[guarIndex][m];
        theGuard = guarIndex;
        minute = +m;
      }
    }
  }
  return minute * theGuard
}

function parse(input: string): {date: Date, action: string | number}[] {
  const regexp = /\[(.*)\] (wakes up|falls asleep|Guard #(\d+) begins shift)/;
  return input.split('\n')
    .map(row => row.match(regexp))
    .map(val => ({date: new Date(val[1]), action: val[3] ? +val[3] : val[2]}))
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
  part1Test(`[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`, 240);
  console.log('---------------------');

  part2Test(`[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`, 4455);
  console.log('---------------------');
}