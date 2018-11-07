import React, { Component } from "react";

class Stopwatch extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 10);
  }

  tick = () => {
    console.log(Date.now());
  };

  state = {
    running: false,
    times: 0,
    output: "00:00:00"
  };

  handleStart = () => {
    this.setState({
      running: true
    });
  };

  handlePause = () => {
    this.setState({
      running: false
    });
  };

  handleStop = () => {
    this.setState({
      running: false
    });
  };

  render() {
    return (
      <div>
        <nav className="Nav">
          <button href="#" onClick={this.handleStart}>
            Start
          </button>
          <button href="#" onClick={this.lap}>
            Lap
          </button>
          <button href="#" onClick={this.handlePause}>
            Pause
          </button>
          <button href="#" onClick={this.handleStop}>
            Stop
          </button>
          <button href="#" onClick={this.restart}>
            Restart
          </button>
          <button href="#" onClick={this.clear}>
            Clear Laps
          </button>
        </nav>
        <div className="Stopwatch">{this.state.output}</div>
        <ul className="results" />
      </div>
    );
  }
}

export default Stopwatch;
