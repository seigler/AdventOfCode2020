const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim().split('\n')

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function slopeImpact (lines, delta) {
  const width = lines[0].length
  const pos = { x: 0, y: 0 }; let count = 0
  while (pos.y < lines.length) {
    if (lines[pos.y].charAt(pos.x) === '#') {
      count++
    }
    pos.y += delta.y
    pos.x += delta.x
    pos.x %= width
  }
  return count
}

async function solveForFirstStar (lines) {
  // report('lines:', lines);
  report('Solution 1:', slopeImpact(lines, { x: 3, y: 1 }))
}

async function solveForSecondStar (lines) {
  const solution = [
    slopeImpact(lines, { x: 1, y: 1 }),
    slopeImpact(lines, { x: 3, y: 1 }),
    slopeImpact(lines, { x: 5, y: 1 }),
    slopeImpact(lines, { x: 7, y: 1 }),
    slopeImpact(lines, { x: 1, y: 2 })
  ].reduce((acc, cur) => acc * cur, 1)
  report('Solution 2:', solution)
}

run()
