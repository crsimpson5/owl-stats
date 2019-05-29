import React from "react";

const BarGraphTooltip = props => {
  const { active, label, payload } = props;

  if (active && payload) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label}`}</p>
        <p className="desc">{`Rank: ${payload[0].payload.rank}`}</p>
        <p className="desc">{`Damage per 10m: ${Math.round(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
}

export default BarGraphTooltip;
