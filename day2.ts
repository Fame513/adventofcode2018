import {getInput, getTestFunction} from './helper';

const DAY = 2;

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: string[]): number {
  let twoCount = 0;
  let threeCount = 0;
  for (const row of input) {
    const countMap = {};
    for (let i = 0; i < row.length; i++) {
      const char = row.charAt(i);
      if (countMap[char]) {
        countMap[char]++;
      } else {
        countMap[char] = 1;
      }
    }
    
    let addTwo = false;
    let addThree = false;
    for (const key in countMap) {
      if (countMap[key] === 2) {
        addTwo = true;
      } else if (countMap[key] === 3) {
        addThree = true;
      }
    }
    
    twoCount += addTwo ? 1 : 0;
    threeCount += addThree ? 1 : 0;
  }
  
  return twoCount * threeCount;
}

function calculatePart2(input: string[]): string {
 for (let i = 0; i < input.length - 1; i++) {
   for (let j = i + 1; j < input.length; j++) {
     const a = input[i];
     const b = input[j];
     if (a.length !== b.length){
       continue;
     }
     let difIndex = -1;
     for (let c = 0; c < a.length; c++) {
       if (a[c] !== b[c]) {
         if (difIndex < 0) {
           difIndex = c;
         } else {
           difIndex = -1;
           break
         }
       }
     }
     if (difIndex >=0) {
       return a.slice(0, difIndex) + a.slice(difIndex + 1);
     }
   }
 }
}

function parse(input: string): string[] {
  return input.split('\n')
    .map(row => row.trim())
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculatePart1(parse(input));
  const result2 = calculatePart2(parse(input));
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(input));
  const part2Test = getTestFunction((input) => calculatePart2(input));
  part1Test([
    'abcdef',
    'bababc',
    'abbcde',
    'abcccd',
    'aabcdd',
    'abcdee',
    'ababab',
  ], 12);
  console.log('---------------------');

  part2Test([
    'abcde',
    'fghij',
    'klmno',
    'pqrst',
    'fguij',
    'axcye',
    'wvxyz',
  ], 'fgij');
  console.log('---------------------');
}