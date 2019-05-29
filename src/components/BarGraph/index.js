import React from "react";
import { BarChart, XAxis, YAxis, Tooltip, Bar, LabelList, Cell } from "recharts";

import BarGraphName from "../../components/BarGraphName";
import BarGraphLabel from "../../components/BarGraphLabel";
import BarGraphTooltip from "../../components/BarGraphTooltip";

const BarGraph = props => {
  const setBarColor = team => {
    switch (team) {
      case "DAL":
        return "#0072ce";
      case "PHI":
        return "#f99f29";
      case "HOU":
        return "#97d700";
      case "BOS":
        return "#174b97";
      case "NYE":
        return "#171c38";
      case "SFS":
        return "#fc4c02";
      case "VAL":
        return "#004438";
      case "GLA":
        return "#3c1053";
      case "FLA":
        return "#feda00";
      case "SHD":
        return "#d22630";
      case "SEO":
        return "#aa8a00";
      case "LDN":
        return "#59cbe8";
      case "CDH":
        return "#ffa000";
      case "HZS":
        return "#fb7299";
      case "PAR":
        return "#303d56";
      case "TOR":
        return "#000000";
      case "VAN":
        return "#2fb228";
      case "WAS":
        return "#990034";
      case "ATL":
        return "#c4c4c4";
      case "GZC":
        return "#122c42";
      default:
        return "red";
    }
  };

  return (
    <BarChart width={600} height={500} data={props.data}>
      <XAxis dataKey="rank" tickSize={0} tickMargin={8} />
      <YAxis hide={true} padding={{ top: 10 }} />
      <Tooltip content={<BarGraphTooltip />} />
      <Bar dataKey="hero_damage_avg_per_10m" maxBarSize={400} fill="black" label={<BarGraphLabel />}>
        <LabelList dataKey="name" content={<BarGraphName />} />
        {
          props.data.map((player, i) => (
            <Cell key={`cell-${i}`} fill={setBarColor(player.team)} />
          ))
        }
      </Bar>
    </BarChart>
  );
}

export default BarGraph;
