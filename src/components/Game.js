import React from 'react';

import Brick from './Brick';

import './Game.css';


class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = ({
      bricks: [],
      maxWidth: this.props.startWidth,
      gap: 10,
      left: 0,
      gameOver: false,
      startInLeft: true,
      score: 0,
      speed: this.props.startSpeed
    })
  }


  componentDidMount(){
    this.startMovingBlock()
    this.props.restartGame(this.restartGame);
  }

  restartGame = () => {
    // console.log('restarted from child')
    this.setState ({
      bricks: [],
      maxWidth: this.props.startWidth,
      left: 0,
      gameOver: false,
      startInLeft: true,
      score: 0,
      speed: this.props.startSpeed,
    });
    this.startMovingBlock();
    this.props.restartGameParrent();


  }

  startMovingBlock = () => {
    let direction = "right";
    let movingInterval = setInterval(() => {

      if (this.state.left <= 0){  // MOVE TO RIGHT
        direction = "right"
      }

      if (this.state.left >= 500 - this.state.maxWidth){
        direction = "left"
      }

      if (direction === "right"){
        this.setState ({
          left: this.state.left + this.state.speed
        })
      } else {
        this.setState ({
          left: this.state.left - this.state.speed
        })
      }
      if (this.state.gameOver || this.props.pauseMoving){
        clearInterval(movingInterval)
      }
    }, 10);
  }

  updateScore = (amount) => {
    const newScore = this.state.score + amount;
    this.setState ({
      score: newScore
    })
    this.props.updateScore(newScore, amount) // FIX UPDATE ----------------------------------------
  }

  setGameOver = () => {
    console.log("game over")
    this.setState ({
      gameOver: true
    })
    this.props.setGameOver()
  }

  handleClick = (e) => {
    if (this.state.bricks.length === 0){

      this.setState ({
        bricks: [...this.state.bricks, <Brick key={this.state.bricks.length} styles={new BrickStyles(this.state.maxWidth, "" , `left: ${this.state.left}px`)}/>],
      });

    } else {
      const lastBlockLeft = +this.state.bricks[this.state.bricks.length-1].props.styles.left[0].slice(0, this.state.bricks[this.state.bricks.length-1].props.styles.left[0].length - 2);
      const lastBlockRight = +this.state.bricks[this.state.bricks.length-1].props.styles.left[0].slice(0, this.state.bricks[this.state.bricks.length-1].props.styles.left[0].length - 2) + +this.state.bricks[this.state.bricks.length-1].props.styles.width.slice(0, this.state.bricks[this.state.bricks.length-1].props.styles.width.length - 2);
      const currentBlockRight = this.state.left + this.state.maxWidth

      // GAIN SPEED
      if (this.props.accelerate){
        // console.log(this.state.bricks.length % this.props.accelerateCount === 0)
        if(this.state.bricks.length % this.props.accelerateCount === 0){
          const currentSpeed = this.state.speed;
          this.setState({
            // speed: this.props.startSpeed + ((Math.floor(this.state.bricks.length / 10) * 2)/10)
            speed: +(currentSpeed + this.props.accelerateAmount).toFixed(1)
          })
        }
        // this.setState({
        //   speed: this.props.startSpeed + ((Math.floor(this.state.bricks.length / 10) * 2)/10)
        // })
      }
      console.log('speed', this.state.speed, 'bricks', this.state.bricks.length)
      // console.log(lastBlockLeft, lastBlockRight, currentBlockRight)

      // const startLeft = this.state.startInLeft;
      // console.log(startLeft)

      if (this.state.left < lastBlockLeft - (this.state.speed / 2)){  // BLOCK FALL TO LEFT  - this.state.speed / 2
        if (this.state.left + this.state.maxWidth < lastBlockLeft){
          this.setGameOver();
          return
        }
        const cutAmount = lastBlockLeft - this.state.left;
        const nextBlockWidth = this.state.maxWidth - cutAmount;
        this.setState ({
          startInLeft: !this.state.startInLeft,
          left: this.state.startInLeft ? 0 : 500 - nextBlockWidth,
          maxWidth: nextBlockWidth,
          bricks: [...this.state.bricks, <Brick key={this.state.bricks.length} styles={new BrickStyles(nextBlockWidth, "" , `left: ${this.state.left + cutAmount}px`)}/>],
        })
        this.updateScore(1)
      // } else if (this.state.left > lastBlockLeft) {
      } else if (currentBlockRight > lastBlockRight + (this.state.speed / 2)){
        if (this.state.left > lastBlockLeft + this.state.maxWidth){
          this.setGameOver();
          return
        }
        const cutAmount = this.state.left - lastBlockLeft;
        const nextBlockWidth = this.state.maxWidth - cutAmount;
        this.setState ({
          startInLeft: !this.state.startInLeft,
          left: this.state.startInLeft ? 0 : 500 - nextBlockWidth,
          maxWidth: nextBlockWidth,
          bricks: [...this.state.bricks, <Brick key={this.state.bricks.length} styles={new BrickStyles(nextBlockWidth, "" , `left: ${this.state.left}px`)}/>],
        })
        this.updateScore(1)
      } else { //if (this.state.left === lastBlockLeft) {
        console.log ("perfect");
        if(this.props.addWidthOnPerfect) {
          const nextBlockWidth = this.state.maxWidth + this.props.widthForPerfect;
          this.setState ({
            startInLeft: !this.state.startInLeft,
            maxWidth: nextBlockWidth,
            left: this.state.startInLeft ? 0 : 500 - nextBlockWidth,
            bricks: [...this.state.bricks, <Brick key={this.state.bricks.length} styles={new BrickStyles(nextBlockWidth, "" , `left: ${this.state.left - Math.floor(this.props.widthForPerfect / 2)}px`)}/>],
          })
        } else {
          this.setState ({
            startInLeft: !this.state.startInLeft,
            left: this.state.startInLeft ? 0 : 500 - this.state.maxWidth,
            bricks: [...this.state.bricks, <Brick key={this.state.bricks.length} styles={new BrickStyles(this.state.maxWidth, "" , `left: ${this.state.left}px`)}/>],
          })
        }
        this.updateScore(2)
      }



      // console.log(+this.state.bricks[this.state.bricks.length-1].props.styles.width.slice(0, this.state.bricks[this.state.bricks.length-1].props.styles.width.length - 2))
      // console.log(this.state.bricks[this.state.bricks.length-1].props.styles.left[0].slice(0, this.state.bricks[this.state.bricks.length-1].props.styles.left[0].length - 2)) // last block left position
    }

    // console.log(this.state.bricks)
    // console.log (e)
  }

  handleRightClick = (e) => {
    e.preventDefault()

      const nextBlockWidth = this.state.maxWidth + this.props.widthForPerfect;
      this.setState ({
        startInLeft: !this.state.startInLeft,
        maxWidth: nextBlockWidth,
        left: this.state.startInLeft ? 0 : 500 - nextBlockWidth,
        bricks: [...this.state.bricks, <Brick key={this.state.bricks.length} styles={new BrickStyles(nextBlockWidth, "" , `left: ${this.state.left - (this.props.widthForPerfect / 2)}px`)}/>],
      })
      this.updateScore(2);
  }

  render(){
    return(
      <>
        <div className='game'
          onClick={this.handleClick}
          onContextMenu={this.handleRightClick}
          style={this.state.gameOver ?
          {backgroundColor: "red"} :
          {backgroundColor: "white"}}>


          {/* <Brick styles={new BrickStyles(300)}/> */}

          {this.state.gameOver ?
          <div className="game-over-message">Game Over</div> :
          null}

          <div className="bricks-zone"
            style={this.state.bricks.length < 11 ?
              {} :
              {position: "absolute", top: `${40 + this.state.gap}px`}}>
            {this.state.bricks}
          </div>
          <div className="running-brick-zone"
            // style={{marginBottom: this.state.gap + "px"}}
            style={this.state.bricks.length < 11 ?
              {marginBottom: this.state.gap + "px"} :
              {marginBottom: this.state.gap + "px", position: "absolute", top: "0px"}}>
              <Brick styles={new BrickStyles(this.state.maxWidth, "green", "color: blue", `left: ${this.state.left}px`)}/>
          </div>
        </div>

      </>
    )
  }
}

function BrickStyles(width, color, ...args){
  this.width = "" + width + "px";
  this.height = "40px";
  this.minHeight = "40px";
  this.backgroundColor = color || "#" + randomColor();
  this.position = 'relative';
  this.border = "1px solid black";
  this.marginBottom = "-1px"
  // this.borderBottom = "0";

  for (let arg of args){
    const dividerPosition = arg.indexOf(':')
    this[arg.slice(0,dividerPosition)] = [arg.slice(dividerPosition + 2)]
  }

  // console.log(args)

}

function randomColor(){
  return Math.floor(Math.random()*16777215).toString(16)
}


export default Game;
