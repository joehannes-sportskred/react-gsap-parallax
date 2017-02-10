const debug = require('debug')('react-parallax-gsap:keyframes')

import _ from 'lodash'

import { percentBetweenZeroAndAHundred, deepClone } from './util'

export const parseKeyframe = keyframe => {
  if (!percentBetweenZeroAndAHundred.test(keyframe)) throw new Error(`${keyframe} is not a valid keyframe`)
  return JSON.parse(percentBetweenZeroAndAHundred.exec(keyframe)[1])
}

export const writeKeyframe = keyframe => `${keyframe}%`

export const keyframeSort = (_a, _b) => {
  const a = parseKeyframe(_a)
  const b = parseKeyframe(_b)
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

export const normalizeKeyframes = e => {
  const el = {...e, keyframes: deepClone(e.keyframes)}
  const has = k => _.has(el, k)
  const get = k => _.get(el, k)
  if (!has('keyframes')) { console.log(e); throw new Error('no keyframes provided') }
  const keyframes = get('keyframes')
  const keys = Object.keys(keyframes).sort(keyframeSort)
  if (keys.length === 0) { console.log(e); throw new Error('no keyframes provided') }
  if (!has(['keyframes', writeKeyframe(0)])) el.keyframes[writeKeyframe(0)] = keyframes[_.first(keys)]
  if (!has(['keyframes', writeKeyframe(100)])) el.keyframes[writeKeyframe(100)] = keyframes[_.last(keys)]
  debug('normalized keyframes', e.keyframes, 'into', el.keyframes)
  return el
}

