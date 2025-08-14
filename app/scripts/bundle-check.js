#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dist = path.resolve(__dirname, '..', 'dist')
const budgetKb = Number(process.env.BUNDLE_BUDGET_KB || 350)

function getTotalSizeKb(dir) {
  let total = 0
  if (!fs.existsSync(dir)) return 0
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) total += getTotalSizeKb(full)
    else total += stat.size
  }
  return Math.round(total / 1024)
}

const totalKb = getTotalSizeKb(path.join(dist, 'assets'))
if (totalKb > budgetKb) {
  console.error(`Bundle size ${totalKb}KB exceeds budget ${budgetKb}KB`)
  process.exit(1)
} else {
  console.log(`Bundle size ${totalKb}KB within budget ${budgetKb}KB`)
}


