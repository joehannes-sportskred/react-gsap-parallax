# react-gsap-parallax

- [codepen](http://codepen.io/amonks/pen/EZddOX)
- [demo](https://react-gsap-parallax.now.sh)
- [github](https://github.com/theuprising/react-gsap-parallax)
- [npm](https://www.npmjs.com/package/react-gsap-parallax)

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
  style: React.PropTypes.object,
  children: React.PropTypes.node.isRequired,
  top: React.PropTypes.number,
  height: React.PropTypes.number.isRequired,
  scrolljack: React.PropTypes.bool,
  onScroll: React.PropTypes.func,
  scrollableAncestor: React.PropTypes.node
}
static defaultProps = {
  scrolljack: false
}
```

If scrolljack is set, the scrollhandler will use [TimelineMax.tweenTo](https://greensock.com/docs/#/HTML5/GSAP/TimelineMax/tweenTo/) rather than [TimelineMax.seek](https://greensock.com/docs/#/HTML5/GSAP/TimelineMax/seek/).

The parallax container can be positioned down the page--not necessarily at the top. Use the `top` and `height` props to control its position.

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



