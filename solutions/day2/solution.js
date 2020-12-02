const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

function mapInput (line) {
  const regex = /(?<num1>[0-9]+)-(?<num2>[0-9]+) (?<letter>[a-z]): (?<password>.+)$/
  return line.match(regex).groups
}

function XOR (a, b) {
  return a ? !b : !!b
}

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim().split('\n').map(mapInput)

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

async function solveForFirstStar (input) {
  const solution = input.filter(
    ({ num1, num2, letter, password }) => {
      let count = 0
      for (let i = 0; i < password.length; i++) {
        if (password.charAt(i) === letter) {
          count++
          if (count > num2) {
            return false
          }
        }
      }
      return count >= num1
    }
  ).length
  report('Input:', input)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = input.filter(
    ({ num1, num2, letter, password }) => {
      return XOR(password.charAt(num1 - 1) === letter, password.charAt(num2 - 1) === letter)
    }
  ).length
  report('Solution 2:', solution)
}

run()
