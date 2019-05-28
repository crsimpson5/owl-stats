import React, { Component } from 'react';
import request from "request";
import { Container, Row, Col, Button } from "react-materialize";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import "./App.scss";

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${Math.round(value)}`}</text>;
};

class CustomTooltip extends Component {
  render() {
    const { active } = this.props;

    if (active) {
      const { label, payload } = this.props;
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
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      header: "Loading..."
    };
  }

  setTopDmg = () => {
    request("https://api.overwatchleague.com/stats/players", (err, response, body) => {
      if (err) console.log("Error: ", err);

      let data = JSON.parse(body).data;

      data.sort((a, b) => b.hero_damage_avg_per_10m - a.hero_damage_avg_per_10m);
      
      data = data.map((player, i) => {
        player.rank = i + 1; 
        return player;
      });

      this.setState({
        data: data.filter((player, i) => i < 10),
        header: "Top 10 damage dealers"
      })
    });
  }

  setBottomDmg = () => {
    request("https://api.overwatchleague.com/stats/players", (err, response, body) => {
      if (err) console.log("Error: ", err);

      let data = JSON.parse(body).data;

      data.sort((a, b) => a.hero_damage_avg_per_10m - b.hero_damage_avg_per_10m);
      
      data = data.map((player, i) => {
        player.rank = i + 1; 
        return player;
      });

      this.setState({
        data: data.filter((player, i) => i < 10),
        header: "Bottom 10 damage dealers"
      })
    });
  }

  componentDidMount() {
    this.setTopDmg();  
  }

  render() {
    return (
      <Container>
        <h1>OWL Stats</h1>
        <h2>{this.state.header}</h2>
        <BarChart width={1000} height={500} data={this.state.data}>
          <XAxis dataKey="name" tickSize tickMargin={8}/>
          <Tooltip content={<CustomTooltip/>} />
          <Bar dataKey="hero_damage_avg_per_10m" fill="#8884d8" label={renderCustomBarLabel} />
        </BarChart>
        <Button onClick={this.setTopDmg}>Top</Button>
        <Button onClick={this.setBottomDmg}>Bottom</Button>
      </Container>
    );
  }
}

export default App;
