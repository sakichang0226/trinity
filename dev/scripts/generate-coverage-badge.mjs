import { readFileSync, writeFileSync } from 'fs'

const summary = JSON.parse(readFileSync('coverage/coverage-summary.json', 'utf-8'))
const pct = summary.total.lines.pct

const color = pct >= 80 ? 'brightgreen' : pct >= 60 ? 'yellow' : 'red'
const badgeUrl = `https://img.shields.io/badge/coverage-${pct}%25-${color}`

const readme = readFileSync('README.md', 'utf-8')
const badge = `![Coverage](${badgeUrl})`

const updated = readme.includes('![Coverage]')
  ? readme.replace(/!\[Coverage\]\([^)]+\)/, badge)
  : readme.replace(/(alt="Vitest">)/, `$1\n  <img src="${badgeUrl}" alt="Coverage">`)

writeFileSync('README.md', updated)
console.log(`Badge updated: ${pct}% (${color})`)
