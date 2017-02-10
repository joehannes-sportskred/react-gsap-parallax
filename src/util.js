// A -> A
export const identity = x => x

export const compose = (...fns) =>
  fns.reduce((prev, curr) => {
    return v => prev(curr(v))
  }, identity)

// Number, Number -> Number -> Number
export const normalize = (min, max) => value =>
  (value - min) / (max - min)

// Number, Number -> Number -> Number
export const clamp = (min, max) => value =>
  value < min ? min : (value > max ? max : value)

// Number -> Number
export const unitClamp = clamp(0, 1)

// Number, Number -> Number
export const normalizeAndUnitClamp = (min, max) => {
  return compose(
    unitClamp,
    normalize(min, max)
  )
}

export const percentBetweenZeroAndAHundred = /^(0|(?:\d{1,2}|100)(?:\.\d*)?)%$/

export const deepClone = v => JSON.parse(JSON.stringify(v))

