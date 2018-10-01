import React from "react";

const Star = props => {
  let stars = [];
  for (let i = 0; i < props.numberOfStars; i++) {
    stars.push(<i key={i} className="fa fa-star" />);
  }
  return <div className="col-3">{stars}</div>;
};
export default Star;
