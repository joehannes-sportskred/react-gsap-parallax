import R from 'ramda'
import { resolve } from 'path'

import {
  addBabel,
  addCJS2,
  addExtern,
  addGlobal,
  addMinify,
  addName,
  addProduction,
  addProgress,
  addSourcemap,
  addUMD,
  base
} from '@amonks/webpack-helpers'

const packageName = require('./package.json').name

const addSrc = R.pipe(
  R.assoc('entry', [resolve(__dirname, 'src/index.js')])
)

const common = R.pipe(
  addSrc,
  addSourcemap,
  addBabel,
  addProgress,
  addExtern('react', 'React'),
  addExtern('react', 'React'),
  addGlobal('TimellineMax'),
  addGlobal('TimelineLite'),
  addName(packageName)
)(base)

const config = [
  addUMD(common),
  addMinify(addUMD(addProduction(common))),
  addCJS2(common),
  addMinify(addCJS2(addProduction(common)))
]

console.log(JSON.stringify(config, undefined, 2))

export default config

