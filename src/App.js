import React from 'react';

import Game from './components/Game';
import Settings from './components/Settings';
import Background from './components/Background';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      score: 0,
      gameOver: false,
      amount: 0,
      addWidthOnPerfect: true,
      widthForPerfect: 10,
      pauseMoving: false,
      startSpeed: 1,
      startWidth: 400,
      accelerate: true,
      accelerateCount: 10,
      accelerateAmount: 0.1,
    })
  }

  updateScore = (newScore, newAmount) => {
    if (newAmount === 2){
      newAmount = 2 + " perfect"
    }
    this.setState ({
      score: newScore,
      amount: newAmount,
    })
    setTimeout(() => {
      this.setState ({
        amount: 0
      })
    }, 300);
  }

  setGameOver = () => {
    this.setState ({
      gameOver: true
    })
  }

  restartGame = () => {
    // console.log('restarted from parent')
    this.setState({
      gameOver: false,
      score: 0,
      pauseMoving: false,
    })
  }

  handleRestartChild = () => {}

  changeSettings = (type, value) => {
    if(type === 'addWidthOnPerfect') {
      this.setState ({
        addWidthOnPerfect: !this.state.addWidthOnPerfect
      })
    } else if (type === 'widthForPerfect'){
      this.setState ({
        widthForPerfect: +value,
      })
    } else if (type === 'speed') {
      this.setState ({
        startSpeed: +value,
      })
    } else if (type === 'startWidth'){
      this.setState ({
        startWidth: +value,
      })
    } else if (type === 'accelerate') {
      this.setState({
        accelerate: !this.state.accelerate
      })
    } else if (type === 'accelerateCount') {
      this.setState({
        accelerateCount: +value
      })
    } else if (type === 'accelerateAmount') {
      this.setState({
        accelerateAmount: +value
      })
    }
    // this.handleRestartChild()
  }

  showSettings = () => {
    this.setState ({
      pauseMoving: true
    })
  }

  render(){
    return(
      <div>
        {/* <div><Background /></div> */} 
        <div className="title">Stacker Game </div>
        <div className="info-pannel">
          <div className="score">Score: {this.state.score} {this.state.amount === 0 ? null : "+" + this.state.amount}</div>
          <div className="restart-button">{this.state.gameOver ?
            <button onClick={() => this.handleRestartChild()}>restart</button> :
            null}</div>
          <div className="settings-button"><button onClick={() => this.showSettings()}>settings</button></div>
        </div>
        <Game updateScore={this.updateScore}
          setGameOver = {this.setGameOver}
          restartGame={restart => this.handleRestartChild = restart}
          restartGameParrent={this.restartGame}
          addWidthOnPerfect={this.state.addWidthOnPerfect}
          widthForPerfect={this.state.widthForPerfect}
          pauseMoving={this.state.pauseMoving}
          startSpeed={this.state.startSpeed}
          startWidth={this.state.startWidth}
          accelerate={this.state.accelerate}
          accelerateCount={this.state.accelerateCount}
          accelerateAmount={this.state.accelerateAmount}
          />
        <div >

        </div>
        <Settings  addWidthOnPerfect={this.state.addWidthOnPerfect}
          widthForPerfect={this.state.widthForPerfect}
          changeSettings={this.changeSettings}
          accelerate={this.state.accelerate}
          accelerateCount={this.state.accelerateCount}
          accelerateAmount={this.state.accelerateAmount}
        />

      </div>
    )
  }
}





export default App;
