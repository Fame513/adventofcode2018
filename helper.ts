declare const require: any;
const http = require('https');

const session = '53616c7465645f5f5a9310a9c44c78b691c389cfed5524dbaefeaa7b3802b7c62c0112ddc03de48e387a663d4c971bc0';

export function getInput(day: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const options = {
      host: 'adventofcode.com',
      path: `/2018/day/${day}/input`,
      headers: {Cookie: `session=${session}`}
    };

    const req = http.request(options, function(response) {
      let str = '';

      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        if (str.charAt(str.length - 1) === '\n') {
          str = str.slice(0, -1);
        }
        resolve(str);
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  })
}

export function getTestFunction(call: (input) => any): (data: any, expected: any) => boolean {
  return (data: string, expected: any) => {
    const actual = call(data);
    if (actual === expected)
      console.log('\x1b[32mSuccess test\x1b[0m:\x1b[36m', data,'\x1b[32m', actual, '\x1b[0m');
    else
      console.log('\x1b[31mFail test\x1b[0m:\x1b[36m', data, '\x1b[0mexpected:\x1b[33m', expected, '\x1b[0mactual:\x1b[31m', actual);

    return actual == expected;
  }
}