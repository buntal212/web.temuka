import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveSourceName, KNOWN_SOURCE_NAMES } from '../src/shared/utils/source-helpers.js'

test('resolveSourceName: uses explicit dynamic name when provided', () => {
  assert.equal(resolveSourceName('larissama', 'Larissama F&B Express'), 'Larissama F&B Express')
  assert.equal(resolveSourceName('unknown_src', 'Custom Name'), 'Custom Name')
})

test('resolveSourceName: resolves known ASU sources without mock prefix', () => {
  assert.equal(resolveSourceName('larissama'), 'Larissama F&B')
  assert.equal(resolveSourceName('laundry'), 'Laundry')
  assert.equal(resolveSourceName('asset'), 'Aset & Properti')
  assert.equal(resolveSourceName('aset'), 'Aset & Properti')
})

test('resolveSourceName: resolves legacy mock sources cleanly', () => {
  assert.equal(resolveSourceName('mock_larissama'), 'Larissama F&B')
  assert.equal(resolveSourceName('mock_laundry'), 'Laundry')
  assert.equal(resolveSourceName('mock_aset'), 'Aset & Properti')
})

test('resolveSourceName: formats unknown sources into readable title without crashing', () => {
  assert.equal(resolveSourceName('clean_water_supply'), 'Clean Water Supply')
  assert.equal(resolveSourceName('katering-harian'), 'Katering Harian')
  assert.equal(resolveSourceName(''), 'Sumber')
  assert.equal(resolveSourceName(null), 'Sumber')
})
