const debug = require('debug')('react-parallax-gsap:ParallaxContainer')

import { TimelineMax } from 'gsap'
import React from 'react'
import reactGSAPEnhancer from 'react-gsap-enhancer'
import autobind from 'autobind-decorator'
import _ from 'lodash'

import { normalizeAndUnitClamp } from './util'
import {
  parseKeyframe,
  keyframeSort,
  normalizeKeyframes
} from './keyframes'

@reactGSAPEnhancer()
export default class ParallaxContainer extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    scrollDistance: React.PropTypes.number.isRequired,
    scrolljack: React.PropTypes.bool,
    style: React.PropTypes.object
  }
  static defaultProps = {
    className: '',
    scrolljack: false,
    style: {}
  }

  constructor (props) {
    super(props)
    this.state = {registry: [], activeRegistry: []}
  }

  @autobind
  registerParallaxChild (props) {
    debug('registerParallaxChild', 'registering a parallax child', props)
    this.setState(state => {
      const {registry} = state
      return {...state, registry: [...registry, props]}
    })
  }

  @autobind
  animate (utils) {
    debug('animating...')
    const builtTimeline = this.elementObjs.reduce((timeline, elementObj, idx, arr) => {
      const element = utils.target.findAll({'data-parallax-id': elementObj['data-parallax-id']})
      const { keyframes } = elementObj
      const [builtTimeline] = Object.keys(keyframes)
        .sort(keyframeSort)
        .reduce(([timeline, prevKey], keyframe, idx, arr) => {
          if (!prevKey) return [timeline, keyframe]
          const value = keyframes[keyframe]
          const prevValue = keyframes[prevKey]
          const duration = (parseKeyframe(keyframe) - parseKeyframe(prevKey))
          const offset = 100 - parseKeyframe(prevKey)
          debug('returning innermost reduce', {value, prevValue, duration, offset})
          return [timeline.fromTo(element, duration / 100, prevValue, value, `=-${offset / 100}`), keyframe]
        }, [timeline, null])
      debug('returning outer reduce', {builtTimeline})
      return builtTimeline
    }, new TimelineMax())
    debug('animated!', {builtTimeline})
    return builtTimeline
  }

  @autobind
  updateAnimation () {
    const position = normalizeAndUnitClamp(0, this.props.scrollDistance)(window.pageYOffset)
    const keyframe = position * 1
    debug('update!', {keyframe, position, scrollDistance: this.props.scrollDistance})
    if (this.props.scrolljack) {
      this.animationController.tweenTo(keyframe)
    } else {
      this.animationController.seek(keyframe).pause()
    }
  }

  componentDidMount () {
    debug('did mount!')
    this.setupAnimation()
    window.addEventListener('scroll', _.throttle(this.updateAnimation.bind(this), 5))
  }

  componentDidUpdate () {
    debug('did update!')
    this.setupAnimation()
  }

  @autobind
  setupAnimation () {
    debug('Setting up animation!')
    const { activeRegistry, registry } = this.state
    if (activeRegistry.length === registry.length) return true

    const eObjs = registry
    const normalizedElementObjs = eObjs.map(normalizeKeyframes)
    this.elementObjs = normalizedElementObjs

    this.animationController = this.addAnimation(this.animate, {scope: this})

    setTimeout(() => { window.scrollTo(0, 0); this.updateAnimation() }, 0)

    this.setState({activeRegistry: registry})
    debug('Set up animation!', {eObjs, normalizedElementObjs, registry})
  }

  render () {
    const children = React.Children.map(this.props.children, c =>
      React.cloneElement(c, {register: this.registerParallaxChild})
    )

    return (
      <div
        className={this.props.className}
        id={this.props.id}
        style={{
          position: 'absolute',
          top: 0,
          height: `${this.props.scrollDistance + window.innerHeight}px`,
          width: '100%',
          ...this.props.style
        }}
      >
        {children}
      </div>
    )
  }
}

