import React, { Component } from "react";

class Stopwatch extends Component {
  state = {
    running: false,
    TimeDifference: 0,
    lastTick: 0,
    laps: []
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, 10);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleStartStop = () => {
    if (this.state.running) {
      this.setState({
        running: false
      });
    } else {
      this.setState({
        running: true,
        lastTick: Date.now()
      });
    }
  };

  handleReset = () => {
    this.setState({
      running: false,
      TimeDifference: 0,
      lastTick: 0
    });
  };

  handleLap = () => {
    if (this.state.TimeDifference !== 0) {
      if (this.state.laps[0] !== this.state.TimeDifference) {
        this.setState({
          laps: [this.state.TimeDifference, ...this.state.laps]
        });
      }
    }
  };

  handleClearLaps = () => {
    this.setState({
      laps: []
    });
  };

  tick = () => {
    if (this.state.running) {
      let now = Date.now();
      let TimeDifference = now - this.state.lastTick;

      this.setState({
        TimeDifference: this.state.TimeDifference + TimeDifference,
        lastTick: now
      });
    }
  };

  format = milliseconds => {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let totalMilliseconds = milliseconds % 1000;
    let formatedMS;

    if (totalMilliseconds > 9) {
      if (totalMilliseconds > 99) {
        formatedMS = `${totalMilliseconds}`;
      } else {
        formatedMS = `0${totalMilliseconds}`;
      }
    } else {
      formatedMS = `00${totalMilliseconds}`;
    }

    return `${minutes > 9 ? minutes : "0" + minutes} : ${
      seconds > 9 ? seconds : "0" + seconds
    } : ${formatedMS}`;
  };

  render() {
    let stopwatch = this.format(this.state.TimeDifference);
    let laps = this.state.laps.map(v => <li key={v}> {this.format(v)}</li>);
    return (
      <React.Fragment>
        <div className="Controls">
          <button href="#" className="start" onClick={this.handleStartStop}>
            {this.state.running ? "Stop" : "Start"}
          </button>
          <button href="#" onClick={this.handleLap}>
            Lap
          </button>
          <button href="#" onClick={this.handleReset}>
            Reset
          </button>
          <button href="#" onClick={this.handleClearLaps}>
            Clear Laps
          </button>
        </div>
        <div className="Stopwatch">{stopwatch}</div>
        <ul className="Results">{laps}</ul>
      </React.Fragment>
    );
  }
}

export default Stopwatch;
