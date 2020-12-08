const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim().split('\n').map(l => /(\w+) (.+)/.exec(l).slice(1))

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function execute (input) {
  let pointer = 0; let accumulator = 0
  let clean = true
  const counts = Array(input.length).fill(0)
  const ops = {
    nop: () => { pointer++ },
    acc: x => { accumulator += x; pointer++ },
    jmp: x => { pointer += x }
  }
  while (pointer < input.length) {
    const [op, x] = input[pointer]
    counts[pointer]++
    if (counts.includes(2)) {
      clean = false
      break
    }
    ops[op](1 * x)
  }
  return { accumulator, clean }
}

function solveForFirstStar (input) {
  report('Solution 1:', execute(input).accumulator)
}

async function solveForSecondStar (input) {
  const swaps = []
  input.forEach(([op, offset], index) => {
    if (op === 'nop' || op === 'jmp') {
      const swap = input.slice()
      swap[index] = [op === 'nop' ? 'jmp' : 'nop', offset]
      swaps.push(swap)
    }
  })
  for (const swap of swaps) {
    const result = execute(swap)
    if (result.clean) {
      report('Solution 2:', result.accumulator)
    }
  }
}

run()
