const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim().split('\n')

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function decode (partition) {
  return parseInt(partition.slice(0, 7).replaceAll('F', 0).replaceAll('B', 1), 2) * 8 + parseInt(partition.slice(7).replaceAll('L', 0).replaceAll('R', 1), 2)
}

async function solveForFirstStar (input) {
  const solution = input.reduce((a, c) => decode(c) > a ? decode(c) : a, -1)
  //  report('Input:', input);
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  let solution = 'UNSOLVED'
  const seats = input.map(decode)
  seats.sort().forEach((seat, i) => (seat - 2 === seats[i - 1]) && (solution = seat - 1))
  report('Solution 2:', solution)
}

run()
