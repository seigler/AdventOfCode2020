const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim().split(',').map(x => 1 * x)

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

async function solveForFirstStar (input) {
  const seq = [...input]
  const next = () => {
    for (let i = 1; i < seq.length; i++) {
      if (seq[seq.length - 1 - i] === seq[seq.length - 1]) {
        return i
      }
    }
    return 0
  }
  while (seq.length < 2020) {
    seq.push(next())
  }

  const solution = seq[2019]
  //  report('Input:', input);
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const lastSeenIndex = new Map(input.slice(0, -1).map((n, i) => [n, i]))
  let last = input[input.length - 1]
  for (let i = input.length; i < 30000000; i++) {
    const next = i - 1 - lastSeenIndex.get(last) || 0
    lastSeenIndex.set(last, i - 1)
    last = next
  }

  report('Solution 2:', last)
}

run()
