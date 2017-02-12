import R from 'ramda'
import {
  addExtern,
  addSourcemap,
  addBabel,
  addProgress
} from '@amonks/webpack-helpers'

const addExterns = R.pipe(
  addExtern('react', 'React'),
  addExtern('react', 'React')
  // addExtern('TimelineLite'),
  // addExtern('TimelineMax'),
  // addAlias('TimelineLite', 'gsap/TimelineLite.js'),
  // addAlias('TimelineLite', 'gsap/TimelineLite.js'),
  // addAlias('TimelineLite', 'gsap/TimelineLite.js'),
  // R.evolve({
  //   externals: R.pipe(
  //     R.assoc('TimelineLite', { root: 'TimelineLite', commonjs: 'gsap/TimelineLite', commonjs2: 'gsap/TimleineLite', amd: 'gsap/TimelineLite' }),
  //     R.assoc('TimelineMax', { root: 'TimelineMax', commonjs: 'gsap/TimelineMax', commonjs2: 'gsap/TimleineLite', amd: 'gsap/TimelineMax' })
  //   )
  // }),
)

const common = R.pipe(
  addExterns,
  addSourcemap,
  addBabel,
  addProgress,
)

export default common

