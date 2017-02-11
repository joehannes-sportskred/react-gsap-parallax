const debug = require('debug')('react-parallax-gsap:ParallaxContainer') // eslint-disable-line

import R from 'ramda'
import React from 'react'
import reactGSAPEnhancer from 'react-gsap-enhancer'
import throttle from 'lodash.throttle'
import { standardProps, pickStandardProps } from './standardProps'

import combineTimelines from './combineTimelines'

class ParallaxContainer extends React.Component {
  static propTypes = {
    ...standardProps,
    children: React.PropTypes.node.isRequired,
    scrollDistance: React.PropTypes.number.isRequired,
    scrolljack: React.PropTypes.any
  }

  static defaultProps = {
    scrolljack: false
  }

  constructor (props) {
    super(props)
    this.makeStyle = this.makeStyle.bind(this)
    this.registerParallaxChild = this.registerParallaxChild.bind(this)
    this.addRegisterProp = this.addRegisterProp.bind(this)
    this.timeline = this.timeline.bind(this)
    this.setupAnimation = this.setupAnimation.bind(this)
    this.seek = this.seek.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  makeStyle () {
    return {
      overflow: 'hidden',
      position: 'absolute',
      left: 0,
      top: 0,
      height: `${this.props.scrollDistance + window.innerHeight}px`,
      width: '100vw'
    }
  }

  registerParallaxChild (timeline) {
    debug('registering', timeline)
    this.timelines = R.append(timeline, this.timelines)
  }

  addRegisterProp (children) {
    debug('adding register prop to', {children})
    return React.Children.map(
      children,
      c => React.cloneElement(c, {registerParallaxElement: this.registerParallaxChild})
    )
  }

  timeline (utils) {
    const timelines = this.timelines
    debug('making animation source', {utils, timelines})
    return combineTimelines(timelines).duration(1).pause()
  }

  setupAnimation () {
    debug('setting up animation')
    this.animationController = this.addAnimation(this.timeline, {scope: this})
    this.animationController.seek(0)
  }

  seek (keyframe) {
    debug(`seeking animation to ${keyframe}`, {keyframe, controller: this.animationController})
    if (this.props.scrolljack) {
      if (this.props.scrolljack === true) this.animationController.tweenTo(keyframe)
      this.animationController.pause().tweenTo(keyframe, this.props.scrolljack)
    } else {
      this.animationController.seek(keyframe).pause()
    }
  }

  handleScroll () {
    debug('running scroll handler')
    this.seek(100 * window.scrollY / this.props.scrollDistance)
  }

  componentDidMount () {
    debug('component did mount')
    this.setupAnimation()
    window.addEventListener('scroll', throttle(this.handleScroll, 16))
  }

  render () {
    return (
      <div style={this.constructor.containerStyle}>
        <div {...pickStandardProps(this.props)}
          style={{...this.makeStyle(), ...this.props.style}}
        >
          {this.addRegisterProp(this.props.children)}
        </div>
      </div>
    )
  }
}

export default reactGSAPEnhancer(ParallaxContainer)

