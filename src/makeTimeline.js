/* global TimelineLite */
const debug = require('debug')('react-gsap-parallax:makeTimeline')
import R from 'ramda'

import normalizeKeyframes from './normalizeKeyframes'

const checkForBadProperties = (() => {
  const badProperties = [
    'fontSize',
    'margin', 'marginTop', 'marginLeft', 'marginRight', 'marginBottom',
    'padding', 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom',
    'top', 'left', 'right', 'bottom',
    'width', 'height'
  ]
  const warn = R.memoize(
    prop => {
      console.warn(`${prop} animates slowly. Use a transform instead`)
    }
  )
  const check = R.pipe(
    Object.values,
    R.map(Object.keys),
    R.reduce(R.concat, []),
    R.uniq,
    R.filter(v => R.contains(v, badProperties)),
    R.forEach(warn)
  )

  const checkOnce = R.memoize(check)

  const checkOffThread = keyframes => setTimeout(() => checkOnce(keyframes), 0)

  return checkOffThread
})()

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
    checkForBadProperties(keyframes)
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

