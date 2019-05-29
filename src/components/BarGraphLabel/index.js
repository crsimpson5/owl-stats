import React from "react";

const BarGraphLabel = props => {
  let { payload, x, y, width, height, value } = props;

  return (
    <text
      x={x + width / 2}
      y={y} fill="#666"
      dy={-6}
      textAnchor="middle"
    >
      {`${Math.round(value)}`}
    </text>
  );
};

export default BarGraphLabel;
