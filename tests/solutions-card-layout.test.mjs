import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(
  new URL('../components/home/SolutionsDeepDive.tsx', import.meta.url),
  'utf8',
)

test('solution cards keep the complete image in a dedicated media region', () => {
  assert.equal((source.match(/solution-card-media/g) ?? []).length, 2)
  assert.equal((source.match(/object-contain/g) ?? []).length, 2)
})

test('solution card copy sits below the image on a light supporting surface', () => {
  assert.equal((source.match(/solution-card-body/g) ?? []).length, 2)
  assert.equal((source.match(/bg-\[#eef7fc\]/g) ?? []).length, 2)
  assert.doesNotMatch(source, /absolute inset-0 bg-gradient-to-t/)
  assert.doesNotMatch(source, /absolute bottom-0 left-0 right-0/)
})
