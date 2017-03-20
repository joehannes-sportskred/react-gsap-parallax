const debug = require('debug')('react-gsap-parallax:parallaxElement')

import R from 'ramda'
import React from 'react'

import makeTimeline from './makeTimeline'
import { standardProps } from './standardProps'

export default class ParallaxElement extends React.Component {
  static propTypes = {
    ...standardProps,
    children: React.PropTypes.node,
    keyframes: React.PropTypes.object.isRequired,
    registerParallaxElement: React.PropTypes.func.isRequired,
    cache: React.PropTypes.bool,
    parallaxStyle: React.PropTypes.object
  }

  static defaultProps = {
    cache: false,
    parallaxStyle: {}
  }

  constructor (props) {
    debug('construct')
    super(props)
    this.register = this.register.bind(this)
  }

  register () {
    debug('registering parallax element', {state: this.state, props: this.props, element: this.element})

    if (!this.props.registerParallaxElement) {
      throw Error('ParallaxElement did not receive registerParallaxElement prop. Is it the direct child of a ParallaxContainer?')
    }

    const { keyframes } = this.props
    const timeline = makeTimeline(keyframes, this.element)
    this.props.registerParallaxElement(timeline)
  }

  componentDidMount () {
    debug('component did mount')
    this.register()
  }

  render () {
    debug('render')
    return (
      <div
        {...R.omit([
          'children',
          'keyframes',
          'cache',
          'parallaxStyle'
        ], this.props)}
        style={{
          ...this.props.style,
          ...this.props.parallaxStyle,
          ...{ willCache: this.props.cache ? 'transform' : 'auto' }
        }}
        ref={element => { this.element = element }}
      >
        {this.props.children}
      </div>
    )
  }
}

