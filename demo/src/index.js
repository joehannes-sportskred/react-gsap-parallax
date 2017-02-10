import React from 'react'
import {render} from 'react-dom'

import { ParallaxContainer, Parallax } from '../../src'

const Demo = () => (
  <ParallaxContainer
    scrollDistance={5000}
    scrolljack={false}
  >
    {/***********************************************/}
    <Parallax
      style={{x: 0, y: 0}}
      keyframes={{
        '0vh': {top: '10vh', left: '10vh', fontSize: '12px'},
        '50vh': {top: '20vh', left: '50vh', fontSize: '36px'},
        '100vh': {top: '100vh', left: '90vh', fontSize: '36px'}
      }}
    >
      <div>
        THING!!!!!
      </div>
    </Parallax>
    {/***********************************************/}
    <Parallax
      keyframes={{
        '0vh': {top: '10vh', left: '10vh', fontSize: '12px'},
        '50vh': {top: '60vh', left: '80vh', fontSize: '100px'},
        '100vh': {top: '80vh', left: '90vh', fontSize: '36px'}
      }}
    >
      <div>
        THING!!!!!
      </div>
    </Parallax>
    {/***********************************************/}
  </ParallaxContainer>
)

render(<Demo />, document.querySelector('#demo'))

