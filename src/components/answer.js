import React from "react";

const Answer = props => {
  return (
    <div className="col-2">
      {props.selectedNumbers.map((number, i) => (
        <span
          key={i}
          onClick={() => {
            props.removeSelectedNumber(number);
          }}
        >
          {number}
        </span>
      ))}
    </div>
  );
};
export default Answer;
