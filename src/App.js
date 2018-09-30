import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

class Game extends React.Component {
  state = {
    selectedNumbers: [],
    numberOfStars: 1 + Math.floor(Math.random()*9),
    answerIsCorrect: null,
    usedNumbers: [],
    numberOfDraws: 5,
    doneStatus: ""
  }

  addSelectedNumber = (addedNumber) => {
    if (this.state.selectedNumbers.indexOf(addedNumber) >= 0 || this.state.usedNumbers.indexOf(addedNumber) >= 0) {
      return;
    } else {
      this.setState(prevState => ({
        answerIsCorrect:null,
        selectedNumbers: prevState.selectedNumbers.concat(addedNumber)
      }))
    }
  }

  removeSelectedNumber = (selectedNumber) => {
  const indexToRemove = this.state.selectedNumbers.indexOf(selectedNumber);
    this.setState((prevState => ({
      answerIsCorrect:null,
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== selectedNumber)

    })))
  }

  checkSumOfStars = () => {
    const sumOfArray = this.state.selectedNumbers.reduce((acc, n) => acc + n, 0);
  this.setState((prevState => ({
     answerIsCorrect: prevState.numberOfStars == sumOfArray,
  })))
  }

  acceptAnswer = () => {
    this.setState((prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: 1 + Math.floor(Math.random()*9)
    })),
    this.gameOverStatus
    )
  }

  reDrawStars = () => {
    if (this.state.numberOfDraws == 0) {
      return;
    }
      this.setState(prevState => ({
        numberOfStars: 1 + Math.floor(Math.random()*9),
        numberOfDraws: prevState.numberOfDraws - 1,
        selectedNumbers: [],
        answerIsCorrect: null,
      }),
      this.gameOverStatus)
  }

  setNumberOfDraws = () => {
    this.setState((prevState => ({
      numberOfDraws: prevState.numberOfDraws ++
    })))
  }

  possibleSolutions = ({numberOfStars, usedNumbers}) => {
    const possibleNumbers = [1,2,3,4,5,6,7,8,9].filter(number =>
      usedNumbers.indexOf(number) == -1)
      return possibleCombinationSum(possibleNumbers, numberOfStars)
  }

  gameOverStatus = () => {
    this.setState(prevState => {
      if (prevState.usedNumbers.length == 9) {
        return { doneStatus: "Done. Nice"};
      }
      if (prevState.numberOfDraws == 0 && !this.possibleSolutions(prevState)) {
        return {doneStatus: "Game over" }
      }
    })
  }

  resetGame = () => {
    this.setState(prevState => (
      {
        selectedNumbers: [],
        numberOfStars: 1 + Math.floor(Math.random()*9),
        answerIsCorrect: null,
        usedNumbers: [],
        numberOfDraws: 5,
        doneStatus: ""

    }))}

  render() {
    const { selectedNumbers, numberOfStars, usedNumbers, numberOfDraws, doneStatus } = this.state
    return(
      <div className = "container">
      <div className = "row">
        <div className = "col-2">
        <h1> Play Nine</h1>
        </div>
       <Star numberOfStars = {numberOfStars} />
       <GameButton
                    selectedNumbers = {selectedNumbers}
                    checkSumOfStars = {this.checkSumOfStars}
                    answerIsCorrect = {this.state.answerIsCorrect}
                    acceptAnswer={this.acceptAnswer}
                    reDrawStars = {this.reDrawStars}
                    numberOfDraws = {numberOfDraws}
                    />
       <Answer selectedNumbers = {selectedNumbers} removeSelectedNumber = {this.removeSelectedNumber} />
       {/* <ReDraw reDrawStars = {this.reDrawStars} setNumberOfDraws = {this.state.setNumberOfDraws}/> */}
       <br/>
       {
         doneStatus ? <Done doneStatus = {doneStatus} resetGame = {this.resetGame}/> : <Number selectedNumbers = {selectedNumbers}
         addSelectedNumber = {this.addSelectedNumber} usedNumbers = {usedNumbers} />
       }
      </div>
      </div>
    )
  }
}

const Star = (props) => {
  const numberOfStars = 1 + Math.floor(Math.random()*9);
  let stars = [];
  for (let i = 0; i < props.numberOfStars; i++) {
    stars.push(<i key = {i} className = "fa fa-star"></i>)
  }
  return (
    <div className = "col-2">
     {stars}
    </div>
  )
}

const GameButton = (props) => {
 let button;
 switch (props.answerIsCorrect) {
   case true:
   button =
   <div className = "col-2">
      <button className = "btn btn-success" onClick = {props.acceptAnswer}>
        <i className = "fa fa-check"></i>
      </button>
    </div>
    break

    case false:
    button =
    <div className = "col-2">
      <button className = "btn btn-danger">
      <i className = "fa fa-times"></i>
      </button>
    </div>
    break

    default:
    button =
    <div className = "col-2">
      <button className = "btn" onClick = {props.checkSumOfStars} disabled = {props.selectedNumbers.length === 0}>=</button>
    </div>
    break
 }
  return (
    <div className = "col-2">
     {button}
     <button className = "btn btn-warning btn-sm" onClick = {props.reDrawStars} disabled = {props.numberOfDraws == 0}>
       <i className = "fa fa-refresh">{props.numberOfDraws}</i>
     </button>
    </div>
  )
}

const Answer = (props) => {
  return (
    <div className = "col-2">
      {props.selectedNumbers.map((number, i) =>
      <span key = {i} onClick = {() => {props.removeSelectedNumber(number)}}>{number}</span>)}
    </div>
  )
}

const Number = (props) => {
  Number.list = [1,2,3,4,5,6,7,8,9];
  const numberClassName = (number) => {
    if (props.usedNumbers.indexOf(number) >= 0){
      return "used"
    }
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return "selected";
    }

  }
  return (
    <div className = "card text-center">
      <div>
        {Number.list.map((number, i) =>
        <span key = {i} className = {numberClassName(number)} onClick = {() => props.addSelectedNumber(number)}>{number}</span>)}
      </div>
    </div>
  )
}

const Done = (props) => {
  return (
    <div className = "text-center">
      <h2>
        {props.doneStatus}
      </h2>
      <button className = "btn btn-secondary" onClick = {props.resetGame}>Play Again</button>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <Game />
      </div>
    );
  }
}

export default App;
