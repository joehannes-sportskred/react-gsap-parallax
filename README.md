# react-gsap-parallax

[try it out on codepen](http://codepen.io/amonks/pen/EZddOX)

to run the demos, clone this, then

```bash
$ npm install
$ npm run start
```

run `localStorage.debug = 'react-gsap-parallax*'` in your console to see logging

## ParallaxContainer

```javascript
static propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string,
  id: React.PropTypes.string,
  scrollDistance: React.PropTypes.number.isRequired,
  scrolljack: React.PropTypes.bool,
  style: React.PropTypes.object
}
static defaultProps = {
  scrolljack: false
}
```

If scrolljack is set, the scrollhandler will use [TimelineMax.tweenTo](https://greensock.com/docs/#/HTML5/GSAP/TimelineMax/tweenTo/) rather than [TimelineMax.seek](https://greensock.com/docs/#/HTML5/GSAP/TimelineMax/seek/).

If scrolljack is set to something other than 'true', it's value will be passed into the tweenTo function, for example:

```javascript
scrolljack={{ease: 'Strong'}}
```

## Parallax

```javascript
static propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string,
  id: React.PropTypes.string,
  keyframes: React.PropTypes.object.isRequired,
  style: React.PropTypes.object,
}
static defaultProps = {}
```

Keyframes is an object with parseIntable keys betwene 0 and 100, and values which are passed as 'vars' to [TweenLite.to](https://greensock.com/docs/#/HTML5/GSAP/TweenLite/to/).

```javascript
keyframes={{
'0%': {top: '100vh', left: 0, fontSize: '12px'},
'100%': {top: '0vh', left: 0, fontSize: '36px'}
}}
```



