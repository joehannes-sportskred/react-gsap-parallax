import React from 'react'

import * as examples from '../examples/'

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

export default class Demo extends React.Component {
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

