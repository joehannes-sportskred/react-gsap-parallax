import R from 'ramda'
import { resolve } from 'path'

import {
  addCJS2,
  addMinify,
  addName,
  addOutputPath,
  addProduction,
  addUMD,
  base
} from '@amonks/webpack-helpers'

import _common from './common.webpack.config.babel.js'

const common = R.pipe(
  _common,
  addName('react-gsap-parallax')
)

const addSrc = R.pipe(
  R.assoc('entry', [resolve(__dirname, 'src/index.js')])
)

const config = [
  R.pipe(
    addSrc,
    addOutputPath('lib'),
    common,
    addCJS2
  )(base),
  R.pipe(
    addSrc,
    addOutputPath('lib'),
    common,
    addCJS2,
    addMinify,
    addProduction
  )(base),
  R.pipe(
    addSrc,
    addOutputPath('umd'),
    common,
    addUMD
  )(base),
  R.pipe(
    addSrc,
    addOutputPath('umd'),
    common,
    addUMD,
    addMinify,
    addProduction
  )(base)
]

// console.log(JSON.stringify(config, undefined, 2))

export default config

