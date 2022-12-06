import React from 'react';

import './Brick.css';

// class Brick extends React.Component {
//   constructor (props) {
//     super(props);
//   }
//
//   render(){
//     return(
//       <div className='brick' style={this.props.styles}> brick </div>
//     )
//   }
// }

export default function Brick(props){
  return(
    <div className='brick' style={props.styles}>  </div>
  )
}
