import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const faq = readFileSync(new URL('../app/faq/page.tsx', import.meta.url), 'utf8')

test('FAQ only publishes source-backed product-use and safety guidance', () => {
  assert.match(faq, /FAQ content policy/)
  assert.doesNotMatch(faq, /การจัดส่งและการคืนสินค้า/)
  assert.doesNotMatch(faq, /ความยั่งยืน/)
  assert.doesNotMatch(faq, /3-5 วันทำการ/)
  assert.doesNotMatch(faq, /5-7 วันทำการ/)
  assert.doesNotMatch(faq, /ภายใน 7 วัน/)
  assert.doesNotMatch(faq, /พลาสติกรีไซเคิล/)
  assert.doesNotMatch(faq, /ภายใน 24 ชั่วโมง/)
})

test('FAQ does not render a non-functional search control', () => {
  assert.doesNotMatch(faq, /id="faq-search"/)
})
