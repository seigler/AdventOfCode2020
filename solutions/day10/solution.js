const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim().split('\n').map(x => 1 * x).sort((a, b) => b - a)
  input.push(0)
  input.unshift(input[0] + 3)

  solveForFirstStar(input)
  solveForSecondStar(input)
}

function solveForFirstStar (input) {
  let ones = 0
  let threes = 0
  input.forEach((s, i, S) => {
    const diff = s - S[i + 1]
    if (diff === 1) {
      ones++
    }
    if (diff === 3) {
      threes++
    }
  })
  const solution = ones * threes
  report('Solution 1:', solution)
}

function solveForSecondStar (input) {
  const choices = []
  input.forEach((s, i, S) => {
    choices[i] = i === 0 ? 1 : 0
    for (let j = 1; ; j++) {
      if (S[i - j] - s <= 3) {
        choices[i] += choices[i - j]
      } else {
        break
      }
    }
  })

  const solution = choices[choices.length - 1]
  report('Solution 2:', solution)
}

run()
