import React from 'react'
import {render} from 'react-dom'

import { ParallaxContainer, Parallax } from '../../src'

const blockStyle = {
  background: '#666',
  width: '400px',
  height: '200px',
  backgroundSize: 'cover !important',
  boxShadow: '0 0 25px 0 rgba(0,0,0,0.8)'
}

const Demo = () => (
  <ParallaxContainer
    scrollDistance={5000}
    scrolljack={false}
    id='parallax'
  >
    {/***********************************************/}
    <Parallax
      style={{top: '50vh'}}
      keyframes={{
        '0%': {left: '-500px'},
        '20%': {left: '-500px'},
        '30%': {left: '100px'},
        '100%': {left: '100px'}
      }}
    >
      <div style={{...blockStyle, background: 'url(http://files3.porsche.com/filestore/image/multimedia/none/jdp-2016-991-2nd-c2-modelimage-key-features/normal/95bef184-905e-11e6-9f1b-0019999cd470/porsche-normal.jpg) no-repeat center center'}} />
    </Parallax>
    {/***********************************************/}
    <Parallax
      style={{top: '50vh'}}
      keyframes={{
        '0%': {left: '150%'},
        '20%': {left: '150%'},
        '30%': {left: '80%'},
        '100%': {left: '80%'}
      }}
    >
      <div style={{...blockStyle, background: 'url(http://files1.porsche.com/filestore/wallpaper/multimedia/none/991-2nd-c4s-gallery-wallpaper-08/wallpaper/c0992e1e-1dcd-11e6-9225-0019999cd470;l63599685700;w1920;h1080/porsche-wallpaper.jpg) no-repeat center center'}} />
    </Parallax>
    {/***********************************************/}
  </ParallaxContainer>
)

render(<Demo />, document.querySelector('#demo'))

