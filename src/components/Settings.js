import React from 'react';

import './Settings.css';

export default function Settings(props){
  return(
    <div className='settings-container'>
      <div className='settings-title'> Settings </div>
      <div className='width-for-perfect'>
        <button onClick={() => props.changeSettings('addWidthOnPerfect')}> {props.addWidthOnPerfect ?
        "on" : "off"} </button>
        Add <input type="number" id="widthForPerfect" name="widthForPerfect"
       min="1" max="30" value={props.widthForPerfect} onChange={(e) => props.changeSettings('widthForPerfect', +e.target.value)}/> width on perfect
      </div>
      <div className='speed'>
        Speed
        <button onClick={() => props.changeSettings("speed", 1)}> x1</button>
        <button onClick={() => props.changeSettings("speed", 2)}> x2</button>
        <button onClick={() => props.changeSettings("speed", 3)}> x3</button>
        <button onClick={() => props.changeSettings("speed", 4)}> x4</button>
        <button onClick={() => props.changeSettings("speed", 5)}> x5</button>
        <button onClick={() => props.changeSettings("speed", 6)}> x6</button>
      </div>
      <div className='start-width'>
        Start width
        <button onClick={() => props.changeSettings("startWidth", 400)}> 400</button>
        <button onClick={() => props.changeSettings("startWidth", 300)}> 300</button>
        <button onClick={() => props.changeSettings("startWidth", 200)}> 200</button>
        <button onClick={() => props.changeSettings("startWidth", 100)}> 100</button>
      </div>
      <div className='accelerate'>
        <button onClick={() => props.changeSettings('accelerate')}> {props.accelerate ?
        "on" : "off"} </button>
        Accelerate when <input type="number" id="accelerate" name="accelerate"
          min="5" max="15" value={props.accelerateCount} onChange={(e) => props.changeSettings('accelerateCount', +e.target.value)}/> block placed
        for <input type="number" id="accelerateAmount" name="accelerateAmount" step=".1"
         min="0.1" max="0.5" value={props.accelerateAmount} onChange={(e) => props.changeSettings('accelerateAmount', +e.target.value)}/> speed
      </div>

      <div>
        <button onClick={() => props.changeSettings('save')}>save</button>
        <button onClick={() => props.changeSettings('cancel')}>cancel</button>
      </div>
    </div>
  )
}
