import React from 'react'
import {render} from 'react-dom'

import Basic from './basic'
import KitchenSink from './kitchensink'
import Scrolljack from './scrolljack'

const examples = {
  Basic,
  KitchenSink,
  Scrolljack
}

const ExampleLinks = ({onChange}) => (
  <ul style={{position: 'fixed', zIndex: 100}}>
    {Object.keys(examples).map(
      (name, key) =>
        <li key={key}>
          <a href='#'
            onClick={() => onChange(name)}
          >{name}</a>
        </li>
    )}
  </ul>
)

class Demo extends React.Component {
  render () {
    const Example = this.state && this.state.example
      ? examples[this.state.example]
      : null

    return (
      <main>
        <ExampleLinks onChange={example => this.setState({example})} />
        { Example && <Example /> }
      </main>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))

