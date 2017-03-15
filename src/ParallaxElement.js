const debug = require('debug')('react-gsap-parallax:parallaxElement')
import React from 'react'

import makeTimeline from './makeTimeline'
import { standardProps, pickStandardProps } from './standardProps'

export default class ParallaxElement extends React.Component {
  static propTypes = {
    ...standardProps,
    children: React.PropTypes.node.isRequired,
    keyframes: React.PropTypes.object.isRequired,
    registerParallaxChild: React.PropTypes.func,
    cache: React.PropTypes.bool
  }

  register () {
    debug('registering parallax element', {state: this.state, props: this.props, element: this.element})
    const { keyframes } = this.props
    const timeline = makeTimeline(keyframes, this.element)
    this.props.registerParallaxElement(timeline)
  }

  constructor (props) {
    super(props)
    this.register = this.register.bind(this)
  }

  componentDidMount () {
    this.register()
  }

  render () {
    return (
      <div {...pickStandardProps(this.props)}
        style={{
          position: 'fixed',
          ...this.props.style,
          ...{ willCache: this.props.cache ? 'transform' : 'auto' }
        }}
        ref={element => { this.element = element }}
      >
        {this.props.children}
      </div>
    )
  }
}

