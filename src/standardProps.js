import { PropTypes } from 'react'
import R from 'ramda'

export const standardProps = {
  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
}

const pickFrom = R.compose(R.pick, Object.keys)

export const pickStandardProps = pickFrom(standardProps)
