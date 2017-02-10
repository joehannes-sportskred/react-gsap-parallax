import React from 'react'

import { Strong, Linear } from 'gsap'
import { ParallaxContainer, Parallax } from '../../src'

export default () => (
  <ParallaxContainer
    scrollDistance={5000}
    scrolljack={{ease: Linear.easeNone}}
  >
    {/***********************************************/}
    <Parallax
      style={{top: '75vh'}}
      keyframes={{
        '0%': {left: 0, easeIn: Linear.easeNone},
        '100%': {left: '100vw', easeOut: Linear.easeNone}
      }}
    >
      <div>
        LINEAR
      </div>
    </Parallax>
    {/***********************************************/}
    <Parallax
      style={{top: '75vh'}}
      keyframes={{
        '0%': {left: 0, easeIn: Strong},
        '100%': {left: '100vw', easeOut: Strong}
      }}
    >
      <div>
        EASE
      </div>
    </Parallax>
    {/***********************************************/}
    <Parallax
      style={{left: '50vw', top: '25vh'}}
      keyframes={{
        '30%': {fontSize: 0},
        '40%': {fontSize: 64}
      }}
    >
      <div>
        POP
      </div>
    </Parallax>
    {/***********************************************/}
    <Parallax
      style={{left: '50vw', top: '50vh'}}
      keyframes={{
        '30%': {opacity: 0},
        '40%': {opacity: 1},
        '50%': {opacity: 0}
      }}
    >
      <div>
        APPEAR
      </div>
    </Parallax>
    {/***********************************************/}
    <Parallax
      style={{
        height: '10vh'
      }}
      keyframes={{
        '0%': {top: '50vh'},
        '100%': {top: '-10vh'}
      }}
    >
      <div>
        MOVE SLOW
      </div>
    </Parallax>
    {/***********************************************/}
    <Parallax
      style={{
        height: '10vh'
      }}
      keyframes={{
        '0%': {top: '100vh'},
        '100%': {top: '-10vh'}
      }}
    >
      <div>
        MOVE
      </div>
    </Parallax>
    {/***********************************************/}
  </ParallaxContainer>
)

