import { test } from 'ava'
import normalizeKeyframes from '../src/normalizeKeyframes'

test('throws an error if passed an empty object', t => {
  try {
    normalizeKeyframes({})
    t.fail()
  } catch (e) {
    t.pass()
  }
})

test('makes front and back if passed one keyframe', t => {
  const result = normalizeKeyframes({ '50%': 'value' })
  t.is(3, result.length)
  t.deepEqual(result[0], { key: 0, value: 'value', duration: 50 })
  t.deepEqual(result[1], { key: 50, value: 'value', duration: 50 })
  t.deepEqual(result[2], { key: 100, value: 'value', duration: 0 })
})

test('throws an error if passed an array', t => {
  try {
    normalizeKeyframes([])
    t.fail()
  } catch (e) {
    t.pass()
  }
})
