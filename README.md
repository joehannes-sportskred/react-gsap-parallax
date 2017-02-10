# react-gsap-parallax

[try it out on codepen](http://codepen.io/amonks/pen/EZddOX)

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

