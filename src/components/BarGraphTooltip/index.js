import React from "react";

const BarGraphTooltip = props => {
  const { active, label, payload } = props;

  if (active && payload) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].payload.name}`}</p>
        <p className="desc">{`Team: ${payload[0].payload.team}`}</p>
        <p className="desc">{`Damage per 10m: ${Math.round(payload[0].value)}`}</p>
        <p className="desc">{`Rank: ${payload[0].payload.rank}`}</p>
      </div>
    );
  }
  return null;
}

export default BarGraphTooltip;
