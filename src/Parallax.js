import React from 'react'

export default class Parallax extends React.Component {
  static propTypes = {
    'data-parallax-id': React.PropTypes.number.isRequired,
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    keyframes: React.PropTypes.object.isRequired,
    style: React.PropTypes.object
  }
  static defaultProps = {
    className: '',
    id: '',
    style: {}
  }

  componentWillMount () {
    const {register} = this.props
    if (register) register(this.props)
  }

  render () {
    const {children, style, className, id} = this.props
    return (
      <div
        className={className}
        id={id}
        style={{position: 'fixed', top: 0, left: 0, ...style}}
      >
        {children}
      </div>
    )
  }
}

