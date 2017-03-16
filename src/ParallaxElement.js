const debug = require('debug')('react-gsap-parallax:parallaxElement')
import React from 'react'

import makeTimeline from './makeTimeline'
import { standardProps, pickStandardProps } from './standardProps'

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
    parallaxStyle: {},
    registerParallaxElement: () => {
      console.warn('trying to register a parallax child before mount! not cool!')
    }
  }

  constructor (props) {
    super(props)
    this.register = this.register.bind(this)
  }

  register () {
    debug('registering parallax element', {state: this.state, props: this.props, element: this.element})
    const { keyframes } = this.props
    const timeline = makeTimeline(keyframes, this.element)
    this.props.registerParallaxElement(timeline)
  }

  componentDidMount () {
    this.register()
  }

  render () {
    return (
      <div {...pickStandardProps(this.props)}
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

