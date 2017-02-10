const debug = require('debug')('react-parallax-gsap:ParallaxContainer') // eslint-disable-line

// import autobind from 'autobind-decorator'
import R from 'ramda'
import React from 'react'
import autobind from 'autobind-decorator'
import reactGSAPEnhancer from 'react-gsap-enhancer'
import throttle from 'lodash.throttle'
import { standardProps, pickStandardProps } from './standardProps'

import combineTimelines from './combineTimelines'

@reactGSAPEnhancer()
export default class ParallaxContainer extends React.Component {
  static propTypes = {
    ...standardProps,
    children: React.PropTypes.node.isRequired,
    scrollDistance: React.PropTypes.number.isRequired,
    scrolljack: React.PropTypes.bool
  }

  static defaultProps = {
    scrolljack: false
  }

  @autobind
  makeStyle () {
    return {
      position: 'absolute',
      top: 0,
      height: `${this.props.scrollDistance + window.innerHeight}px`,
      width: '100%'
    }
  }

  @autobind
  registerParallaxChild (timeline) {
    debug('registering', timeline)
    this.timelines = R.append(timeline, this.timelines)
  }

  @autobind
  addRegisterProp (children) {
    debug('adding register prop to', {children})
    return React.Children.map(
      children,
      c => React.cloneElement(c, {registerParallaxElement: this.registerParallaxChild})
    )
  }

  @autobind
  timeline (utils) {
    const timelines = this.timelines
    debug('making animation source', {utils, timelines})
    return combineTimelines(timelines)
  }

  @autobind
  setupAnimation () {
    debug('setting up animation')
    this.animationController = this.addAnimation(this.timeline, {scope: this})
  }

  @autobind
  updateAnimation () {
    const keyframe = 100 * window.scrollY / this.props.scrollDistance
    debug('updating animation', {keyframe, controller: this.animationController})
    if (this.props.scrolljack) {
      this.animationController.tweenTo(keyframe)
    } else {
      this.animationController.seek(keyframe).pause()
    }
  }

  componentDidMount () {
    this.setupAnimation()
    debug('registering scroll handler')
    window.addEventListener('scroll', throttle(this.updateAnimation, 5))
  }

  render () {
    return (
      <div {...pickStandardProps(this.props)}
        style={{...this.makeStyle(), ...this.props.style}}
      >
        {this.addRegisterProp(this.props.children)}
      </div>
    )
  }
}

