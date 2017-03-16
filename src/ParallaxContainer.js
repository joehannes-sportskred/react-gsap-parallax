const debug = require('debug')('react-parallax-gsap:ParallaxContainer') // eslint-disable-line

import React from 'react'
import throttle from 'lodash.throttle'
import { standardProps, pickStandardProps } from './standardProps'

import combineTimelines from './combineTimelines'

class ParallaxContainer extends React.Component {
  static propTypes = {
    ...standardProps,
    children: React.PropTypes.node.isRequired,
    top: React.PropTypes.number,
    height: React.PropTypes.number.isRequired,
    scrolljack: React.PropTypes.bool,
    onScroll: React.PropTypes.func
  }

  static defaultProps = {
    scrolljack: false,
    top: 0,
    onScroll: x => x
  }

  constructor (props) {
    super(props)
    this.addChildProps = this.addChildProps.bind(this)
    this.getPosition = this.getPosition.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.makeChildStyle = this.makeChildStyle.bind(this)
    this.makeColumnStyle = this.makeColumnStyle.bind(this)
    this.makeStyle = this.makeStyle.bind(this)
    this.registerParallaxChild = this.registerParallaxChild.bind(this)
    this.seek = this.seek.bind(this)
    this.setupAnimation = this.setupAnimation.bind(this)
    this.timeline = this.timeline.bind(this)
    this.state = {
      position: 'top'
    }
  }

  addChildProps (children) {
    debug('adding register prop to', {children})
    return React.Children.map(
      children,
      c => {
        if (c.type.name !== 'ParallaxElement') return c
        return React.cloneElement(c, {
          registerParallaxElement: this.registerParallaxChild,
          parallaxStyle: this.makeChildStyle()
        })
      }
    )
  }

  getPosition () {
    debug('get position')
    const { height, top } = this.props

    if (typeof document === 'undefined') return top

    const scrollPosition = document.body.scrollTop
    if (scrollPosition < top) return 'top'
    if (scrollPosition > (top + height)) return 'bottom'
    return 'active'
  }

  handleScroll () {
    debug('running scroll handler')
    const oldPosition = this.state.position
    const position = this.getPosition()
    if (position !== oldPosition) this.setState({position})
    if (position === 'active') {
      const progress = (window.scrollY - this.props.top) / this.props.height
      this.seek(100 * progress)
      this.props.onScroll(progress)
    }
  }

  makeChildStyle () {
    const position = this.getPosition()
    debug(`make child style for position: "${position}"`)

    if (position === 'top') {
      return {
        position: 'absolute'
      }
    }

    if (position === 'bottom') {
      return {
        position: 'absolute'
      }
    }

    if (position === 'active') {
      return {
        position: 'fixed'
      }
    }
  }

  makeColumnStyle () {
    return {
      position: 'relative',
      height: typeof window !== 'undefined'
        ? this.props.height + window.innerHeight
        : this.props.height,
      top: this.props.top
    }
  }

  makeStyle () {
    debug('make style')
    const position = this.getPosition()
    return {
      overflow: 'hidden',
      position: position === 'active'
        ? 'fixed'
        : 'absolute',
      top: position === 'bottom'
        ? this.props.top + this.props.height
        : this.props.top,
      left: 0,
      height: window.innerHeight,
      width: '100vw'
    }
  }

  registerParallaxChild (timeline) {
    debug('registering', timeline)
    this.timelines = this.timelines
      ? [...this.timelines, timeline]
      : [timeline]
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

  setupAnimation () {
    debug('setting up animation')
    this.animationController = this.timeline()
    console.log('animationController', this.animationController)
    this.animationController.seek(0)
  }

  timeline () {
    const timelines = this.timelines
    return combineTimelines(timelines).duration(1).pause()
  }

  componentDidMount () {
    debug('component did mount')
    this.setupAnimation()
    window.addEventListener('scroll', throttle(this.handleScroll, 16))
  }

  render () {
    return (
      <div style={this.makeColumnStyle()}>
        <div {...pickStandardProps(this.props)}
          style={{...this.makeStyle(), ...this.props.style}}
        >
          {this.addChildProps(this.props.children)}
        </div>
      </div>
    )
  }
}

export default ParallaxContainer

