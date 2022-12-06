import React from 'react';

class Background extends React.Component {
  constructor(props){
    super(props)
    const arr = [];
    for (let i = 0; i < 40; i++){
      const row = [];
      for (let i = 0; i < 15; i++){
        row.push(<div key={i} style={new BackgroundBrickStyles()} />)
      }
      arr.push(<div key={i} className="background-row">{row}</div>)
    }
    this.state = ({
      background: arr,
    })
  }

  shouldComponentUpdate(){
    return false;
  }

  render(){
    return(
      <div className="background">{this.state.background}</div>
    )
  }
}


// function Background () {
//   const arr = [];
//   for (let i = 0; i < 40; i++){
//     const row = [];
//     for (let i = 0; i < 15; i++){
//       row.push(<div style={new BackgroundBrickStyles()} />)
//     }
//     arr.push(<div className="background-row">{row}</div>)
//   }
//   return arr;
// }

function BackgroundBrickStyles(){
  this.left = "" + (Math.random() * (300 - 200) + 200) + "px";
  this.display = "inline-block";
  this.width = "" + (Math.random() * (300 - 200) + 200) + "px";
  this.height = "40px";
  this.minHeight = "40px";
  this.backgroundColor = "#" + randomColor();
  // this.position = 'relative';
  this.borderLeft = "1px solid black";
  this.borderTop = "1px solid black";
  this.marginBottom = "-1px";
  this.overflow = "hidden";
}

function randomColor(){
  return Math.floor(Math.random()*16777215).toString(16)
}

export default Background;
