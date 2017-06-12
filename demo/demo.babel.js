import React from 'react'
import { render } from 'react-dom'
import * as examples from '../examples/'

window.gsap = {
  TimelineMax: window.TimelineMax,
  TimelineLite: window.TimelineLite,
}

const ExampleLinks = ({ onChange, examples }) => {
  return (
    <ul style={{ position: 'fixed', zIndex: 100 }}>
      {Object.keys(examples).map((name, key) => (
        <li key={key}>
          <a href="#" onClick={() => onChange(name)}>{name}</a>
        </li>
      ))}
    </ul>
  )
}

export default class Demo extends React.Component {
  render() {
    const { examples } = this.props
    const Example = this.state && this.state.example
      ? examples[this.state.example]
      : null
    return (
      <main>
        {
          <ExampleLinks
            onChange={example => this.setState({ example })}
            examples={examples}
          />
        }
        {Example && <Example />}
      </main>
    )
  }
}

render(<Demo examples={examples} />, document.querySelector('#root'))
