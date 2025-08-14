#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dist = path.resolve(__dirname, '..', 'dist')
const budgetKb = Number(process.env.BUNDLE_BUDGET_KB || 350)

function getAllFiles(dir) {
  const entries = fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }) : []
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...getAllFiles(full))
    else files.push(full)
  }
  return files
}

function getTotalGzipSizeKb(dir) {
  const files = getAllFiles(dir).filter((f) => /\.(js|css)$/.test(f))
  let total = 0
  for (const file of files) {
    const buf = fs.readFileSync(file)
    const gz = gzipSync(buf)
    total += gz.length
  }
  return Math.round(total / 1024)
}

const assetsDir = path.join(dist, 'assets')
const totalGzipKb = getTotalGzipSizeKb(assetsDir)
if (totalGzipKb > budgetKb) {
  console.error(`Bundle size ${totalGzipKb}KB (gz) exceeds budget ${budgetKb}KB`)
  process.exit(1)
} else {
  console.log(`Bundle size ${totalGzipKb}KB (gz) within budget ${budgetKb}KB`)
}


