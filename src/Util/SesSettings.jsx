import React from 'react';
import ReactSlider from 'react-slider';
import './SesSettings.css'



function SesSettings() {
  return (
    <div className='SesSettings'>
      <label>Work Minutes: </label>
      <ReactSlider 
      className='slider'
      thumbClassName='thumb'
      trackClassName='track'
      value={45}
      min={1}
      max={120}
      
      
      />

      <label>Break Minutes: </label>
      <ReactSlider 
      className='slider green'
      thumbClassName='thumb'
      trackClassName='track'
      value={45}
      min={1}
      max={120}
      
      
      />
    </div>
  )
}

export default SesSettings