import {getInput, getTestFunction} from './helper';
const BronKerbosch = require('almete.bronkerbosch');
const DAY = 23;

// tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function distance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
}

function calculatePart1(input) {
  input.sort((a, b) => b.r - a.r);
  const strong = input[0];
  let result = 0;
  for (const bot of input) {
    if (distance(bot, strong) <= strong.r) {
      result++;
    }
  }
  return result;
}

function getMaxCross(map: {[index: string]: string[]}, arr: string[]): string[] {
  let best = [];
  for (const val of arr) {
    const res = getMaxCross(map, map[val].filter(v => v != val && arr.indexOf(v) >= 0));
    if (res.length + 1 > best.length) {
      res.push(val);
      best = res;
    }
  }
  return best
}

function calculatePart2(input) {
  const cross: {[index: string]: string[]} = {};
  const arr = [];
  // const edges = [];
  // for (let a = 0; a < input.length - 1; a++) {
  //   for (let b = a + 1; b < input.length; b++) {
  //     if (distance(input[a], input[b]) <= input[a].r + input[b].r) {
  //       edges.push([a, b]);
  //     }
  //   }
  // }
  // const cliques = BronKerbosch(edges);
  // cliques.sort((a, b) => b.length - a.length);
  // console.log(cliques[0].toString());
  //
  // return;
  // for (const a in input) {
  //   arr.push(a);
  //   cross[a] = [];
  //   for (const b in input) {
  //     if (distance(input[a], input[b]) <= input[a].r + input[b].r) {
  //       cross[a].push(b);
  //     }
  //   }
  // }
  // const crossBots = getMaxCross(cross, arr);
  // console.log(crossBots);
  const crossindex = [67,68,106,108,119,121,122,150,178,191,196,204,215,220,236,246,256,260,261,270,277,283,292,305,368,374,389,410,416,424,436,453,454,474,482,484,501,505,514,567,569,591,630,658,757,761,770,772,798,857,859,869,903,909,918,933,957,48,64,78,83,151,192,230,269,276,351,371,391,442,446,460,499,521,612,641,645,685,688,691,714,725,735,759,856,863,865,927,934,991,52,111,147,163,255,298,328,398,493,532,604,610,619,640,650,668,777,796,866,20,79,372,498,600,642,817,977,5,23,31,38,46,62,89,96,132,135,190,213,216,375,401,439,450,579,661,712,727,812,838,852,884,920,989,15,41,157,222,285,354,525,565,594,626,733,814,854,882,883,915,940,963,27,37,72,117,156,171,180,182,188,200,227,263,341,343,350,385,395,402,435,445,459,464,468,477,497,549,562,588,657,687,701,702,708,747,766,815,816,824,825,834,849,861,885,893,904,905,959,964,965,976,988,10,44,63,104,107,131,134,167,168,214,218,225,238,248,307,310,320,331,342,344,348,352,365,367,373,386,390,419,429,452,458,504,516,554,555,602,611,710,755,762,773,802,804,806,827,841,846,847,858,860,935,955,956,998,19,81,88,129,154,172,177,201,206,211,245,273,318,355,394,417,418,495,523,538,561,575,655,695,699,709,716,726,742,795,836,872,878,907,919,931,948,950,953,958,960,985,3,8,17,25,50,51,54,75,76,84,94,99,101,102,103,128,130,153,159,160,170,174,176,179,194,199,202,203,209,210,221,228,231,234,243,247,250,251,264,271,274,279,280,282,284,288,295,300,311,315,319,345,349,358,363,370,377,383,384,405,422,423,425,426,430,438,461,463,472,475,503,508,513,515,522,527,530,542,547,576,577,580,585,587,599,616,623,624,638,643,649,651,662,665,672,673,681,682,690,703,721,723,730,731,740,763,768,769,775,780,781,789,793,800,801,818,822,826,851,855,868,870,879,886,890,892,894,895,902,914,952,954,962,969,975,982,995,0,1,2,4,6,7,9,11,12,13,14,16,18,21,22,24,26,28,29,30,32,33,34,35,36,39,40,42,43,45,47,49,53,55,56,57,59,60,61,65,66,69,70,71,73,74,80,82,85,86,87,90,91,92,93,95,97,98,100,105,109,110,112,113,114,115,116,118,120,123,124,125,126,127,133,136,137,138,139,140,141,142,143,144,145,146,148,149,152,155,158,161,162,164,165,166,169,173,175,181,183,184,185,186,187,189,193,197,198,205,207,212,217,219,223,224,226,229,232,233,235,237,239,240,241,242,244,252,253,254,257,258,259,262,265,266,267,268,272,275,278,281,286,287,289,290,291,293,294,296,297,299,301,302,303,304,306,308,309,312,313,314,316,317,321,322,323,324,325,326,327,329,330,332,334,335,336,337,338,339,340,346,347,353,356,357,359,360,361,362,364,366,369,376,378,379,380,381,382,387,388,392,396,397,399,400,403,404,406,407,408,409,411,412,413,414,415,420,421,427,428,431,432,433,434,437,440,441,443,444,447,448,449,451,455,456,457,462,465,466,467,469,470,471,473,476,478,479,480,481,483,485,486,487,488,489,490,491,492,494,496,500,502,506,507,509,510,511,512,517,518,519,520,524,526,528,529,531,533,534,535,536,537,539,540,541,543,544,545,546,548,550,552,553,556,557,558,559,560,563,564,566,568,570,571,572,573,574,578,581,582,583,584,586,589,590,592,593,595,596,597,598,601,603,605,606,607,608,609,613,614,615,617,618,620,621,622,625,627,628,629,631,632,633,634,635,636,637,639,644,646,648,652,653,654,656,659,660,663,664,666,667,669,670,671,674,675,676,677,678,679,680,683,684,686,689,692,693,694,696,697,698,700,704,705,706,707,711,713,715,717,718,719,720,722,724,728,729,732,734,736,737,738,739,741,743,744,745,746,748,749,750,751,752,753,754,756,758,760,764,765,767,771,774,776,778,779,782,783,784,785,786,787,788,790,791,792,794,797,799,803,805,807,808,809,810,811,813,819,820,821,823,828,829,830,831,832,833,835,837,840,842,843,844,845,848,850,853,864,867,871,873,874,875,876,877,880,881,887,888,889,891,896,897,898,899,900,901,906,908,910,911,912,913,916,917,921,922,923,924,925,926,928,929,930,932,936,937,938,939,941,942,943,945,946,947,949,951,961,966,967,968,970,971,973,974,978,979,980,981,983,984,986,987,990,992,993,994,996,999];

  // while (input.length) {
  //   let big;
  //   let max = 0;
  //   for (const key in cross) {
  //     const keyCount = Object.keys(cross[key]).length;
  //     if (keyCount > max) {
  //       max = keyCount;
  //       big = key
  //     }
  //   }
  //   crossBots.push(input[+big]);
  //   input = input.filter((v, i) => cross[big][i.toString()] && +big !== i);
  // }
  // let min = Infinity;
  // let a1, b1;
  input = input.filter((v, i) => crossindex.indexOf(i) >= 0);
  console.log(input.length);
  let bx = 0, by = 0, bz = 0;
  for (const a in input) {
    bx += input[a].x;
    by += input[a].y;
    bz += input[a].z;
    // for (const b in input) {
    //   const dist = (input[a].r + input[b].r) - distance(input[a], input[b]);
    //   if ( dist < min) {
    //     min = dist;
    //     a1 = a;
    //     b1 = b;
    //   }
    // }
  }
  bx = Math.floor(bx / input.length);
  by = Math.floor(by / input.length);
  bz = Math.floor(bz / input.length);
  console.log(bx, by, bz);
 
  const crossSphere = [];
  for (const bot of input) {
    if (distance(bot, {x: bx, y: by, z: bz}) <= bot.r) {
      crossSphere.push(bot);
    }
  }
  // let max = 0;
  // let sp;
  // for (const bot of crossSphere) {
  //   const dist = distance(bot, {x: 0, y: 0, z: 0}) - bot.r
  //   if  (dist > max) {
  //     max = dist;
  //     sp = bot;
  //   }
  // }
  console.log(crossSphere.length);
  // console.log(sp);
  // console.log(input[+a1], input[+b1], distance(input[+a1], input[+b1]), input[+a1].r + input[+b1].r);
}

function parse(input: string): { x: number, y: number, z: number, r: number }[] {
  const regexp = /pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)/;
  return input.split('\n')
    .map(row => row.match(regexp))
    .map(val => ({x: +val[1], y: +val[2], z: +val[3], r: +val[4]}));
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculatePart1(parse(input));
  const result2 = calculatePart2(parse(input));
  return [result1, result2];
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(parse(input)));
  const part2Test = getTestFunction((input) => calculatePart2(parse(input)));
  part1Test(`pos=<0,0,0>, r=4
pos=<1,0,0>, r=1
pos=<4,0,0>, r=3
pos=<0,2,0>, r=1
pos=<0,5,0>, r=3
pos=<0,0,3>, r=1
pos=<1,1,1>, r=1
pos=<1,1,2>, r=1
pos=<1,3,1>, r=1`, 7);
  console.log('---------------------');

  part2Test(`pos=<10,12,12>, r=2
pos=<12,14,12>, r=2
pos=<16,12,12>, r=4
pos=<14,14,14>, r=6
pos=<50,50,50>, r=200
pos=<10,10,10>, r=5`, '12,12,12');
  console.log('---------------------');
}