import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const ignoredDirs = new Set(['.git', '.next', 'node_modules', 'proofs'])
const textExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json', '.md'])

const findings = []

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full)
      continue
    }
    if (!textExtensions.has(path.extname(entry.name))) continue
    inspect(full)
  }
}

function inspect(file) {
  const rel = path.relative(root, file).replaceAll('\\', '/')
  if (rel === 'scripts/production-readiness.mjs') return
  const source = fs.readFileSync(file, 'utf8')

  const checks = [
    { name: 'dead href', regex: /href\s*=\s*["']#["']/g },
    { name: 'coming soon copy', regex: /coming\s+soon/gi },
    { name: 'placeholder public copy', regex: /placeholder(?![:\w-])/gi },
    { name: 'hard-coded Captain Maid Vercel hostname', regex: /captain-maid\.vercel\.app/gi },
  ]

  for (const check of checks) {
    const matches = [...source.matchAll(check.regex)]
    for (const match of matches) {
      const before = source.slice(0, match.index)
      const line = before.split('\n').length
      findings.push(`${rel}:${line} ${check.name}: ${match[0]}`)
    }
  }
}

walk(root)

if (findings.length) {
  console.error('PRODUCTION READINESS FAILED')
  for (const finding of findings) console.error(`- ${finding}`)
  process.exit(1)
}

if (process.env.VERCEL_ENV === 'production' && !process.env.NEXT_PUBLIC_SITE_URL) {
  console.error('PRODUCTION READINESS FAILED')
  console.error('- NEXT_PUBLIC_SITE_URL is required for production deploys')
  process.exit(1)
}

console.log('PRODUCTION READINESS PASSED')
