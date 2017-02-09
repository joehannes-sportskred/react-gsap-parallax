import React from 'react'
import {render} from 'react-dom'
import incrementGenerator from 'increment-generator'

import { ParallaxContainer, Parallax } from '../../src'

const generateId = incrementGenerator()

const Demo = () => (
  <ParallaxContainer
    scrollDistance={5000}
    style={{background: 'green'}}
    scrolljack={false}
    id='satellites'
  >
    {/***********************************************/}
    <Parallax
      data-parallax-id={generateId()}
      style={{color: 'yellow'}}
      keyframes={{
        '0%': {y: '200px', x: '800px', fontSize: '12px'},
        '100%': {y: '600px', x: '500px', fontSize: '36px'}
      }}
    >
      <div>
        THING!!!!!
      </div>
    </Parallax>
    {/***********************************************/}
    <Parallax
      data-parallax-id={generateId()}
      style={{color: 'blue'}}
      keyframes={{
        '0%': {y: '200px', x: '500px', fontSize: '12px'},
        '100%': {y: '600px', x: '800px', fontSize: '36px'}
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

