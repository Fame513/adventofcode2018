import {getInput, getTestFunction} from './helper';

const DAY = 8;

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: number[]): number {
  const [sum, datalength] = recursion(input);
  return sum;
}

function recursion(input: number[]): [number, number] {
  if (input.length === 0) {
    return [0, 0];
  }
  const nodes = input[0];
  const metaCount = input[1];
  let totalSum = 0;
  let totalDataLength = 2;
  for (let i = 0; i < nodes; i++) {
    const [sum, dataLength] = recursion(input.slice(totalDataLength));
    totalSum +=sum;
    totalDataLength += dataLength;
  }
  for (let i = totalDataLength; i < totalDataLength + metaCount; i++) {
    totalSum += input[i];
  }
  return [totalSum, totalDataLength + metaCount]
}

function recursion2(input: number[]): [number, number] {
  if (input.length === 0) {
    return [0, 0];
  }
  const nodes = input[0];
  const metaCount = input[1];
  let totalDataLength = 2;
  const nodesSum = [];
  for (let i = 0; i < nodes; i++) {
    const [sum, dataLength] = recursion2(input.slice(totalDataLength));
    nodesSum[i] = sum;
    totalDataLength += dataLength;
  }
  let totalSum = 0;
  if (nodesSum.length === 0) {
    for (let i = totalDataLength; i < totalDataLength + metaCount; i++) {
      totalSum += input[i];
    }
  } else {
    for (let i = totalDataLength; i < totalDataLength + metaCount; i++) {
      totalSum += nodesSum[input[i] - 1] || 0;
    }
  }
  return [totalSum, totalDataLength + metaCount]
}


function calculatePart2(input) {
  const [sum, datalength] = recursion2(input);
  return sum;
}

function parse(input: string): number[] {
  const regexp = /\d+/;
  return input.split(' ')
    .map(val => +val)
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
  part1Test('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2', 138);
  console.log('---------------------');

  part2Test('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2', 66);
  console.log('---------------------');
}