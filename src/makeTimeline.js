const debug = require('debug')('react-gsap-parallax:makeTimeline')
import R from 'ramda'
import { TimelineLite } from 'gsap'

/**
 * @typedef {Object} keyframe
 * @param {string|number} key - Anything parseFloat can deal with. Must be between 0 and 100 inclusive.
 * @param {Object} value - passed directly into gsap
 */

const sort = R.sortBy(R.nth(0))

const checkDomain = (() => {
  const checkOne = val => {
    if (val < 0 || val > 100) {
      throw new Error(`keyframes must be between 0 and 100. ${val} isn\'t.`)
    }
  }

  return keyframes => {
    const [[firstKey]] = keyframes
    const [lastKey] = R.last(keyframes)
    checkOne(firstKey)
    checkOne(lastKey)
    return keyframes
  }
})()

const addFirst = keyframes => {
  const [[firstKey, firstValue]] = keyframes
  if (firstKey === 0) return keyframes
  return [[0, firstValue], ...keyframes]
}

const addLast = keyframes => {
  const [lastKey, lastValue] = R.last(keyframes)
  if (lastKey === 100) return keyframes
  return [...keyframes, [100, lastValue]]
}

const addEnds = R.pipe(addFirst, addLast)

const deepClone = R.compose(JSON.parse, JSON.stringify)

const toObjects = _keyframes => {
  const keyframes = deepClone(_keyframes)
  return keyframes.map(([key, value]) => ({
    key,
    value,
    duration: 0
  }))
}

const addDurations = _keyframes => {
  const keyframes = deepClone(_keyframes)
  return keyframes.map((keyframe, index) => {
    if (index === keyframes.length - 1) {
      return {
        ...keyframe,
        duration: 0
      }
    } else {
      const next = keyframes[index + 1]
      return {
        ...keyframe,
        duration: next.key - keyframe.key
      }
    }
  })
}

const log = msg => R.tap(v => debug(msg, v))

/**
 * Turn a keyframes object into an array of objects
 *
 * @param {Array<keyframe>} keyframes
 * @return {Array<Object>} normalizedKeyframes - array of objects with keys: 'value', 'key', 'duration'
 */

const normalizeKeyframes = R.pipe(
  log('normalizing'),

  R.toPairs,
  log('made pairs'),

  R.map(R.adjust(parseFloat, 0)),
  log('made float'),

  sort,
  log('sorted'),

  checkDomain,
  log('validated domain'),

  addEnds,
  log('added ends'),

  toObjects,
  log('made objects'),

  addDurations,
  log('added durations'),

  log('normalized')
)

/**
 * Turn a keyframes object into a gsap timeline
 *
 * curried -- if you just pass keyframes, you get a function that accepts an element
 *
 * @param {element} element
 * @param {Array<keyframe>} keyframes
 * @return {TimelineLite} timeline - duration 100
 */

const makeTimeline = R.curry(
  (keyframes, element) => {
    const normalizedKeyframeArray = normalizeKeyframes(keyframes)
    const [head, ...tail] = normalizedKeyframeArray
    debug('making timeline', {head, tail, keyframes, normalizedKeyframeArray})
    return tail.reduce(
      (timeline, keyframe, index) => {
        const {value} = keyframe
        const previousKeyframe = normalizedKeyframeArray[index]
        debug('adding keyframe to timeline', {previousKeyframe, value, element, keyframe})
        return timeline.to(element, previousKeyframe.duration, value)
      },
      new TimelineLite().to(element, 0, head.value)
    )
  }
)

export default makeTimeline

