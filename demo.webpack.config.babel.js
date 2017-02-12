import R from 'ramda'
import { resolve } from 'path'

import {
  addName,
  addOutputPath,
  addUMD,
  base
} from '@amonks/webpack-helpers'

import common from './common.webpack.config.babel.js'

const addDemoSrc = R.pipe(
  R.assoc('entry', [resolve(__dirname, 'demo/demo.babel.js')])
)

const config = R.pipe(
  addName('demo'),
  addDemoSrc,
  addOutputPath('demo'),
  common,
  addUMD
)(base)

console.log(JSON.stringify(config, undefined, 2))

export default config

