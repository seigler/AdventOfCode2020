const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim().split('\n\n').map(
    line => line.replace(/\n/g, ' ').split(' ').reduce((acc, cur) => {
      const [key, value] = cur.split(':')
      return { ...acc, [key]: value }
    }, {})
  )

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

const required = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid'
]

const between = (a, b, c) => {
  return a <= b && b <= c
}

const validators = {
  byr: x => between(1920, parseInt(x), 2002),
  iyr: x => between(2010, parseInt(x), 2020),
  eyr: x => between(2020, parseInt(x), 2030),
  hgt: x => {
    const parsed = x.match(/(\d+)(cm|in)/)
    if (!parsed) return false
    const [, height, units] = parsed
    if (units === 'cm') {
      return between(150, parseInt(height), 193)
    } else if (units === 'in') {
      return between(59, parseInt(height), 76)
    } else return false
  },
  hcl: x => /^#[0-9a-f]{6}$/.test(x),
  ecl: x => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(x),
  pid: x => /^[0-9]{9}$/.test(x)
}

function isValid (line) {
  for (const key of required) {
    console.log(Object.keys(line), key)
    if (!Object.keys(line).includes(key)) { return false }
  }
  return true
}

async function solveForFirstStar (input) {
  const solution = input.filter(isValid).length
  report('Input:', input)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = input.filter(doc => {
    for (const [key, validator] of Object.entries(validators)) {
      if (!validator(doc[key])) return false
    }
    return true
  }).length
  report('Solution 2:', solution)
}

run()
