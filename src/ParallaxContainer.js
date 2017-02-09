import { TimelineMax } from 'gsap'
import React from 'react'
import reactGSAPEnhancer from 'react-gsap-enhancer'
import { normalizeAndUnitClamp } from './util'
import autobind from 'autobind-decorator'
import _ from 'lodash'

const percentBetweenZeroAndAHundred = /^(0|(?:\d{1,2}|100)(?:\.\d*)?)%$/
const parseKeyframe = keyframe => {
  if (!percentBetweenZeroAndAHundred.test(keyframe)) throw new Error(`${keyframe} is not a valid keyframe`)
  return JSON.parse(percentBetweenZeroAndAHundred.exec(keyframe)[1])
}
const writeKeyframe = keyframe => `${keyframe}%`

const keyframeSort = (_a, _b) => {
  const a = parseKeyframe(_a)
  const b = parseKeyframe(_b)
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

const normalizeKeyframes = e => {
  const el = {...e}
  const has = k => _.has(el, k)
  const get = k => _.get(el, k)
  if (!has('keyframes')) { console.log(e); throw new Error('no keyframes provided') }
  const keyframes = get('keyframes')
  const keys = Object.keys(keyframes).sort(keyframeSort)
  if (keys.length === 0) { console.log(e); throw new Error('no keyframes provided') }
  if (!has(['keyframes', writeKeyframe(0)])) el.keyframes[writeKeyframe(0)] = keyframes[_.first(keys)]
  if (!has(['keyframes', writeKeyframe(100)])) el.keyframes[writeKeyframe(100)] = keyframes[_.last(keys)]
  return el
}

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
    this.setState(state => {
      const {registry} = state
      return {...state, registry: [...registry, props]}
    })
  }

  @autobind
  animate (utils) {
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
          return [timeline.fromTo(element, duration / 100, prevValue, value, `=-${offset / 100}`), keyframe]
        }, [timeline, null])
      return builtTimeline
    }, new TimelineMax())
    return builtTimeline
  }

  @autobind
  updateAnimation () {
    const position = normalizeAndUnitClamp(0, this.props.scrollDistance)(window.pageYOffset)
    const keyframe = position * 1
    if (this.props.scrolljack) {
      this.animationController.tweenTo(keyframe)
    } else {
      this.animationController.seek(keyframe).pause()
    }
  }

  componentDidMount () {
    this.setupAnimation()
    window.addEventListener('scroll', _.throttle(this.updateAnimation.bind(this), 5))
  }

  componentDidUpdate () {
    this.setupAnimation()
  }

  @autobind
  setupAnimation () {
    const { activeRegistry, registry } = this.state
    if (activeRegistry.length === registry.length) return true

    const eObjs = registry
    const normalizedElementObjs = eObjs.map(normalizeKeyframes)
    this.elementObjs = normalizedElementObjs

    this.animationController = this.addAnimation(this.animate, {scope: this})

    setTimeout(() => { window.scrollTo(0, 0); this.updateAnimation() }, 0)

    this.setState({activeRegistry: registry})
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

