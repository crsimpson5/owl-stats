import React from "react";

const BarGraphName = props => {
  let { payload, x, y, width, height, value } = props;

  const getFontColor = fill => {
    switch(fill) {
      case "#feda00":
      case "#f99f29":
      case "#97d700":
      case "#aa8a00":
      case "#59cbe8":
      case "#ffa000":
      case "#fb7299":
      case "#2FB228":
      case "#c4c4c4":
      case "#67a2b2":
        return "black";
      default: 
        return "white";
    }
  };

  return (
    <text
      x={x + width / 2}
      y={450}
      dy={14}
      fill="white"
      transform={`rotate(270 ${x + width / 2}, 450)`}
      fontSize="40px"
      fill={getFontColor(props.fill)}
    >
      {`${value.toUpperCase()}`}
    </text>
  );
};

export default BarGraphName;
