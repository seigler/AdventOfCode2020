const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  let input = (await read(fromHere('input.txt'), 'utf8')).trim().split('\n')
  input = input.map(line => line.split(''))

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

// function draw (input) {
//   for (const row of input) {
//     console.log(row.join(''))
//   }
// }

function neighbors (input, row, col) {
  let total = 0
  if (input[row - 1]) {
    if (input[row - 1][col - 1] === '#') total++
    if (input[row - 1][col] === '#') total++
    if (input[row - 1][col + 1] === '#') total++
  }
  if (input[row][col - 1] === '#') total++
  if (input[row][col + 1] === '#') total++
  if (input[row + 1]) {
    if (input[row + 1][col - 1] === '#') total++
    if (input[row + 1][col] === '#') total++
    if (input[row + 1][col + 1] === '#') total++
  }
  return total
}

function step (input) {
  const next = JSON.parse(JSON.stringify(input))
  input.forEach((row, y, rows) => {
    row.forEach((seat, x, seats) => {
      if (seat === 'L' && neighbors(input, y, x) === 0) { next[y][x] = '#' }
      if (seat === '#' && neighbors(input, y, x) >= 4) { next[y][x] = 'L' }
    })
  })
  return next
}

function stabilize (input) {
  // console.log('\nInput\n--------')
  // draw(input)
  let old; let fresh = input
  do {
    old = fresh
    fresh = step(old)
    // console.log(`\nRound ${rounds}\n--------`)
    // draw(fresh)
  } while (JSON.stringify(old) !== JSON.stringify(fresh))
  return fresh
}

async function solveForFirstStar (input) {
  const stable = stabilize(input)
  const filledSeats = stable.flat(2).filter(x => x === '#').length
  report('Solution 1:', filledSeats)
}

async function solveForSecondStar (input) {
  const solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()
