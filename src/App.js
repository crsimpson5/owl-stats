import React, { Component, Fragment } from "react";
import request from "request";
import { Container, Button, Pagination } from "react-materialize";
import "./App.scss";
import dummyData from "./dummyData";

import BarGraph from "./components/BarGraph";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerData: [],
      graphData: [],
      sortBy: "",
      graphMax: 0,
      header: "Loading...",
      pagination: 1,
      pages: 10
    };
  }

  getPlayerData = () => {
    request("https://api.overwatchleague.com/stats/players", (err, response, body) => {
      if (err) console.log("Error: ", err);

      let data = JSON.parse(body).data;

      this.setState({
        playerData: data,
        pages: Math.ceil(data.length / 10)
      }, () => this.setTopDmg(this.state.playerData));
    });
  };

  setTopDmg = data => {
    if (!data) return;

    data.sort((a, b) => b.hero_damage_avg_per_10m - a.hero_damage_avg_per_10m);
    data = data.map((player, i) => {
      player.rank = i + 1;
      return player;
    });

    this.setState({
      graphData: data.filter((player, i) => i < 10),
      header: "Top 10 damage dealers",
      sortBy: "hero_damage_avg_per_10m",
      graphMax: data[0].hero_damage_avg_per_10m,
      pagination: 1
    });
  };

  setTopHealing = data => {
    if (!data) return;

    data.sort((a, b) => b.healing_avg_per_10m - a.healing_avg_per_10m);
    data = data.map((player, i) => {
      player.rank = i + 1;
      return player;
    });

    this.setState({
      graphData: data.filter((player, i) => i < 10),
      header: "Top 10 healers",
      sortBy: "healing_avg_per_10m",
      pagination: 1
    });
  };

  handlePageSelect = (event, data) => {
    if (!data) return;

    const setGraphData = page => {
      if (page * 10 > this.state.playerData.length) {
        return data.filter((player, i) => i >= this.state.playerData.length - 10)
      } else {
        return data.filter((player, i) => i >= page * 10 - 10 && i < page * 10)
      }
    };

    this.setState({
      graphData: setGraphData(event),
      pagination: event,
    });
  };

  componentDidMount() {
    // this.getPlayerData();

    console.log(dummyData.length);

    this.setState(
      {
        playerData: dummyData,
        pages: Math.ceil(dummyData.length / 10),
      },
      () => this.setTopDmg(this.state.playerData)
    );
  }

  render() {
    return (
      <Container>
        <h1>OWL Stats</h1>
        <h2>{this.state.header}</h2>
        <BarGraph
          data={this.state.graphData}
          sortBy={this.state.sortBy}
        />
        <Pagination
          activePage={this.state.pagination}
          maxButtons={10}
          items={this.state.pages}
          onSelect={event => this.handlePageSelect(event, this.state.playerData)}
        />
        <Button onClick={() => this.setTopDmg(this.state.playerData)}>Top dps</Button>
        <Button onClick={() => this.setTopHealing(this.state.playerData)}>Top healers</Button>
      </Container>
    );
  }
}

export default App;
