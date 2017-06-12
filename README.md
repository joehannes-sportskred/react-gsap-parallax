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

run `localStorage.debug = 'react-gsap-parallax*'` in your console to see some logging.

## ParallaxContainer

```javascript
static propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
  top: PropTypes.number,
  height: PropTypes.number.isRequired,
  scrolljack: PropTypes.bool,
  onScroll: PropTypes.func,
  scrollableAncestor: PropTypes.node,
}
static defaultProps = {
  scrolljack: false,
  top: 0,
  onScroll: x => x,
}
```

If scrolljack is set, the scrollhandler will use [TimelineMax.tweenTo](https://greensock.com/docs/#/HTML5/GSAP/TimelineMax/tweenTo/) rather than [TimelineMax.seek](https://greensock.com/docs/#/HTML5/GSAP/TimelineMax/seek/).

The parallax container can be positioned down the page--not necessarily at the top. Use the `top` and `height` props to control its position. It's always full-width.

## Parallax

```javascript
static propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  cache: PropTypes.bool,
  keyframes: PropTypes.object.isRequired,
}
static defaultProps = {
  cache: false,
}
```

Keyframes is an object with parseInt-able keys between 0 and 100, and values which are passed as 'vars' to [TweenLite.to](https://greensock.com/docs/#/HTML5/GSAP/TweenLite/to/).

If you set the `cache` prop, it'll automatically add `willCache: 'transform'` to your css. You might find that convenient.

```javascript
keyframes={{
  '0%': {top: '100vh', left: 0, fontSize: '12px'},
  '100%': {top: '0vh', left: 0, fontSize: '36px'}
}}
```
