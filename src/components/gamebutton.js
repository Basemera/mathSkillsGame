import React from "react";

const GameButton = props => {
  let button;
  switch (props.answerIsCorrect) {
    case true:
      button = (
        <div className="col-2">
          <button className="btn btn-success" onClick={props.acceptAnswer}>
            <i className="fa fa-check" />
          </button>
        </div>
      );
      break;

    case false:
      button = (
        <div className="col-2">
          <button className="btn btn-danger">
            <i className="fa fa-times" />
          </button>
        </div>
      );
      break;

    default:
      button = (
        <div className="col-2">
          <button
            className="btn"
            onClick={props.checkSumOfStars}
            disabled={props.selectedNumbers.length === 0}
          >
            =
          </button>
        </div>
      );
      break;
  }
  return (
    <div className="col-2">
      {button}
      <button
        className="btn btn-warning btn-sm"
        onClick={props.reDrawStars}
        disabled={props.numberOfDraws === 0}
      >
        <i className="fa fa-refresh">{props.numberOfDraws}</i>
      </button>
    </div>
  );
};
export default GameButton
