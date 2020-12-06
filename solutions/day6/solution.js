const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim().split('\n\n')

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function yesses (group) {
  return group.replace(/\s+/gm, '').split('').reduce((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], [])
}

async function solveForFirstStar (input) {
  let solution = 0
  for (const group of input) {
    solution += yesses(group).length
  }
  //  report('Input:', input);
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  let solution = 0
  for (const group of input) {
    const numAnswers = group.split('\n').length
    solution += yesses(group).filter(yes => group.split(yes).length === numAnswers + 1).length
  }
  report('Solution 2:', solution)
}

run()
