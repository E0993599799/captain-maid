#!/usr/bin/env node
/**
 * Runs the `lighthouse` CLI (as a child process, JSON output) against one or
 * more already-running local pages and writes raw JSON + a human-readable
 * summary. Intended to reuse the Playwright webServer (npm run build && npm
 * run start on :3000) — this script does NOT start its own server.
 *
 * Usage:
 *   node scripts/lighthouse-run.mjs                # home page only
 *   node scripts/lighthouse-run.mjs --all           # home + /faq + one product page
 */
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const execFileAsync = promisify(execFile)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const PROOFS_DIR = path.join(ROOT, 'proofs')

const BASE_URL = 'http://localhost:3000'
const ALL = process.argv.includes('--all')

const TARGETS = ALL
  ? [
      { url: `${BASE_URL}/`, outfile: 'lighthouse-home.json', label: 'Home (/)' },
      { url: `${BASE_URL}/faq`, outfile: 'lighthouse-faq.json', label: 'FAQ (/faq)' },
      {
        url: `${BASE_URL}/products/floor-cleaner-lavender-kerry`,
        outfile: 'lighthouse-product.json',
        label: 'Product (/products/floor-cleaner-lavender-kerry)',
      },
    ]
  : [{ url: `${BASE_URL}/`, outfile: 'lighthouse-home.json', label: 'Home (/)' }]

const LIGHTHOUSE_BIN = path.join(ROOT, 'node_modules', '.bin', 'lighthouse')

function fmt(n, digits = 0) {
  return typeof n === 'number' ? n.toFixed(digits) : 'n/a'
}

async function runOne({ url, outfile, label }) {
  const outPath = path.join(PROOFS_DIR, outfile)
  console.log(`\n--- Running Lighthouse against ${label} (${url}) ---`)

  const args = [
    url,
    '--output=json',
    `--output-path=${outPath}`,
    '--chrome-flags=--headless=new --no-sandbox --disable-gpu',
    '--only-categories=performance,accessibility,best-practices,seo',
    '--quiet',
  ]

  try {
    await execFileAsync(LIGHTHOUSE_BIN, args, { maxBuffer: 1024 * 1024 * 50 })
  } catch (err) {
    console.error(`Lighthouse run FAILED for ${label}:`, err.message)
    throw err
  }

  const raw = JSON.parse(await (await import('node:fs/promises')).readFile(outPath, 'utf-8'))
  const cats = raw.categories
  const audits = raw.audits

  const summary = {
    label,
    url,
    scores: {
      performance: Math.round((cats.performance?.score ?? 0) * 100),
      accessibility: Math.round((cats.accessibility?.score ?? 0) * 100),
      bestPractices: Math.round((cats['best-practices']?.score ?? 0) * 100),
      seo: Math.round((cats.seo?.score ?? 0) * 100),
    },
    metrics: {
      lcpMs: audits['largest-contentful-paint']?.numericValue,
      clsScore: audits['cumulative-layout-shift']?.numericValue,
      tbtMs: audits['total-blocking-time']?.numericValue,
      fcpMs: audits['first-contentful-paint']?.numericValue,
      speedIndexMs: audits['speed-index']?.numericValue,
    },
  }

  console.log(`Scores  — Performance: ${summary.scores.performance}  Accessibility: ${summary.scores.accessibility}  Best Practices: ${summary.scores.bestPractices}  SEO: ${summary.scores.seo}`)
  console.log(`CWV lab — LCP: ${fmt(summary.metrics.lcpMs)}ms  CLS: ${fmt(summary.metrics.clsScore, 3)}  TBT: ${fmt(summary.metrics.tbtMs)}ms  FCP: ${fmt(summary.metrics.fcpMs)}ms  SI: ${fmt(summary.metrics.speedIndexMs)}ms`)
  console.log(`Raw JSON saved to: ${outPath}`)

  return summary
}

async function main() {
  await mkdir(PROOFS_DIR, { recursive: true })
  const summaries = []
  for (const target of TARGETS) {
    // eslint-disable-next-line no-await-in-loop
    const summary = await runOne(target)
    summaries.push(summary)
  }

  const summaryPath = path.join(PROOFS_DIR, 'lighthouse-summary.json')
  await writeFile(summaryPath, JSON.stringify(summaries, null, 2))

  console.log('\n=== Lighthouse Summary ===')
  for (const s of summaries) {
    console.log(`\n${s.label}`)
    console.log(`  Performance: ${s.scores.performance}/100`)
    console.log(`  Accessibility: ${s.scores.accessibility}/100`)
    console.log(`  Best Practices: ${s.scores.bestPractices}/100`)
    console.log(`  SEO: ${s.scores.seo}/100`)
    console.log(`  LCP: ${fmt(s.metrics.lcpMs)}ms | CLS: ${fmt(s.metrics.clsScore, 3)} | TBT: ${fmt(s.metrics.tbtMs)}ms`)
  }
  console.log(`\nSummary JSON: ${summaryPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
