import React, { Component, Fragment } from "react";
import request from "request";
import { Container, Button } from "react-materialize";
import "./App.scss";

import BarGraph from "./components/BarGraph";

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
      let dataLength = data.length;

      data.sort((a, b) => a.hero_damage_avg_per_10m - b.hero_damage_avg_per_10m);

      data = data.map((player, i) => {
        player.rank = dataLength - i;
        return player;
      });

      this.setState({
        data: data.filter((player, i) => i < 10),
        header: "Bottom 10 damage dealers"
      })
    });
  };

  componentDidMount() {
    this.setTopDmg();
  }

  render() {
    return (
      <Container>
        <h1>OWL Stats</h1>
        <h2>{this.state.header}</h2>
        <BarGraph data={this.state.data} />
        <Button onClick={this.setTopDmg}>Top</Button>
        <Button onClick={this.setBottomDmg}>Bottom</Button>
      </Container>
    );
  }
}

export default App;
