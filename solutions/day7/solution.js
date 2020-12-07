const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  // light red bags contain 1 bright white bag, 2 muted yellow bags.
  const input = (await read(fromHere('input.txt'), 'utf8')).trim().split('\n').map(
    line => {
      const [color, rest] = line.split(' bags contain ')
      let contents
      if (rest === 'no other bags.') contents = []
      else {
        contents = rest.slice(0, -1).split(', ').map(i => {
          const [, qty, color] = i.match(/(\d+) (.+) bags?/)
          return {
            quantity: 1 * qty,
            color
          }
        })
      }
      return {
        color,
        contents
      }
    }
  ).reduce((acc, cur) => ({ ...acc, [cur.color]: cur.contents }), {})
  /*
{
  color
  contents: [
    { quantity, color}
  ]
}
*/

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

async function solveForFirstStar (input) {
  const outerColors = new Set()
  Object.entries(input).forEach(([color, contents]) => {
    if (contents.some(
      bag => bag.color === 'shiny gold')
    ) {
      outerColors.add(color)
    }
  })
  let oldSize
  while (oldSize !== outerColors.size) {
    oldSize = outerColors.size
    Object.entries(input).forEach(
      ([color, contents]) => {
        if (
          !outerColors.has(color) &&
          contents.some(bag => outerColors.has(bag.color))
        ) {
          outerColors.add(color)
        }
      }
    )
  }
  const solution = outerColors.size
  //  report('Input:', input);
  report('Solution 1:', solution)
}

function count (input, color) {
  if (input[color].length === 0) return 1
  return input[color].reduce((acc, bag) => acc + bag.quantity * count(input, bag.color), 1)
}

async function solveForSecondStar (input) {
  report('Solution 2:', count(input, 'shiny gold') - 1)
}

run()
