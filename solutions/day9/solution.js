const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim().split('\n').map(x => 1 * x)

  const partOne = solveForFirstStar(input)
  solveForSecondStar(partOne, input)
}

function solveForFirstStar (input) {
  for (let i = 25; i < input.length; i++) {
    const n = input[i]
    const window = input.slice(i - 25, i)
    if (window.filter(x => window.includes(n - x)).length === 0) {
      report('Solution 1: ', n)
      return n
    }
  }
}

function solveForSecondStar (partOne, input) {
  for (let i = 0; i < input.length; i++) {
    if (i < partOne) {
      for (let t = 0, j = 0; t < partOne && i + j < input.length; j++) {
        t += input[i + j]
        if (t === partOne) {
          const sequence = input.slice(i, i + j).sort((a, b) => a - b)
          report('Solution 2:', sequence[0] + sequence[sequence.length - 1])
          return
        }
      }
    }
  }
}

run()
