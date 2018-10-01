import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Answer from "./answer";
import Done from "./done";
import GameButton from "./gamebutton";
import Number from "./number";
import Star from "./star";

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) {
    return true;
  }
  if (arr[0] > n) {
    return false;
  }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length,
    combinationsCount = 1 << listSize;
  for (var i = 1; i < combinationsCount; i++) {
    var combinationSum = 0;
    for (var j = 0; j < listSize; j++) {
      if (i & (1 << j)) {
        combinationSum += arr[j];
      }
    }
    if (n === combinationSum) {
      return true;
    }
  }
  return false;
};

class Game extends React.Component {
  state = {
    selectedNumbers: [],
    numberOfStars: 1 + Math.floor(Math.random() * 9),
    answerIsCorrect: null,
    usedNumbers: [],
    numberOfDraws: 5,
    doneStatus: ""
  };

  addSelectedNumber = addedNumber => {
    if (
      this.state.selectedNumbers.indexOf(addedNumber) >= 0 ||
      this.state.usedNumbers.indexOf(addedNumber) >= 0
    ) {
      return;
    } else {
      this.setState(prevState => ({
        answerIsCorrect: null,
        selectedNumbers: prevState.selectedNumbers.concat(addedNumber)
      }));
    }
  };

  removeSelectedNumber = selectedNumber => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(
        number => number !== selectedNumber
      )
    }));
  };

  checkSumOfStars = () => {
    const sumOfArray = this.state.selectedNumbers.reduce(
      (acc, n) => acc + n,
      0
    );
    this.setState(prevState => ({
      answerIsCorrect: prevState.numberOfStars === sumOfArray
    }));
  };

  acceptAnswer = () => {
    this.setState(
      prevState => ({
        usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        answerIsCorrect: null,
        numberOfStars: 1 + Math.floor(Math.random() * 9)
      }),
      this.gameOverStatus
    );
  };

  reDrawStars = () => {
    if (this.state.numberOfDraws === 0) {
      return;
    }
    this.setState(
      prevState => ({
        numberOfStars: 1 + Math.floor(Math.random() * 9),
        numberOfDraws: prevState.numberOfDraws - 1,
        selectedNumbers: [],
        answerIsCorrect: null
      }),
      this.gameOverStatus
    );
  };

  setNumberOfDraws = () => {
    this.setState(prevState => ({
      numberOfDraws: prevState.numberOfDraws++
    }));
  };

  possibleSolutions = ({ numberOfStars, usedNumbers }) => {
    const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
      number => usedNumbers.indexOf(number) === -1
    );
    return possibleCombinationSum(possibleNumbers, numberOfStars);
  };

  gameOverStatus = () => {
    this.setState(prevState => {
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: "Done. Nice" };
      }
      if (prevState.numberOfDraws === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: "Game over" };
      }
    });
  };

  resetGame = () => {
    this.setState(prevState => ({
      selectedNumbers: [],
      numberOfStars: 1 + Math.floor(Math.random() * 9),
      answerIsCorrect: null,
      usedNumbers: [],
      numberOfDraws: 5,
      doneStatus: ""
    }));
  };

  render() {
    const {
      selectedNumbers,
      numberOfStars,
      usedNumbers,
      numberOfDraws,
      doneStatus
    } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 text-left">
            <h1> Play Nine</h1>
            <ul>
              <li>Pick a number whose sum is the number of stars displayed</li>
              <li>Then select the = sign.</li>
              <li>
                Your answer is correct you will get a check, after which you can
                go ahead and click the check mark to accept the answer
              </li>
              <li>
                If your answer is wrong, you will get an x and you can select
                another set of numbers and try again
              </li>
              <li>
                Should you wish to have another set of stars click the yellow
                button with the counter to refresh. You have 5 draws.
              </li>
              <li>Happy gaming</li>
            </ul>
          </div>
          <div className="col-8">
            <div className="row">
              <Star numberOfStars={numberOfStars} />
              <GameButton
                selectedNumbers={selectedNumbers}
                checkSumOfStars={this.checkSumOfStars}
                answerIsCorrect={this.state.answerIsCorrect}
                acceptAnswer={this.acceptAnswer}
                reDrawStars={this.reDrawStars}
                numberOfDraws={numberOfDraws}
              />
              <Answer
                selectedNumbers={selectedNumbers}
                removeSelectedNumber={this.removeSelectedNumber}
              />
              {/* <ReDraw reDrawStars = {this.reDrawStars} setNumberOfDraws = {this.state.setNumberOfDraws}/> */}
              <br />
              {doneStatus ? (
                <Done doneStatus={doneStatus} resetGame={this.resetGame} />
              ) : (
                <Number
                  selectedNumbers={selectedNumbers}
                  addSelectedNumber={this.addSelectedNumber}
                  usedNumbers={usedNumbers}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Game;
