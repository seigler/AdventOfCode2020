const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim().split('\n').map(x => parseInt(x, 10))

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function findSum (array, startIndex, sum, count = 2) {
  for (let i = 0; i < array.length; i++) {
    const n = array[i]
    if (count > 2) {
      const searchResult = findSum(array, i + 1, sum - n, count - 1)
      if (searchResult) {
        return [n, ...searchResult]
      }
    } else if (count === 2) {
      for (let j = startIndex + 1; j < array.length; j++) {
        if (n + array[j] === sum) {
          return [n, array[j]]
        }
      }
    } else {
      throw new Error('findSum: Invalid count')
    }
  }
  return null
}

async function solveForFirstStar (input) {
  const solution = findSum(input, 0, 2020, 2).reduce((acc, cur) => acc * cur, 1)
  report('Input:', input)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = findSum(input, 0, 2020, 3).reduce((acc, cur) => acc * cur, 1)
  report('Solution 2:', solution)
}

run()
