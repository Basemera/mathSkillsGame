import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Game from "./components/game";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}
export default App;
