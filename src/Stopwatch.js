import React, { Component } from "react";

class Stopwatch extends Component {
  state = {
    running: false,
    elapsed: 0,
    lastTick: 0,
    laps: []
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, 1);
  }

  tick = () => {
    if (this.state.running) {
      let now = Date.now();
      let diff = now - this.state.lastTick;

      this.setState({
        elapsed: this.state.elapsed + diff,
        lastTick: now
      });
    }
  };

  handleStart = () => {
    this.setState({
      running: true,
      lastTick: Date.now()
    });
  };

  handlePause = () => {
    this.setState({
      running: false
    });
  };

  handleStop = () => {
    this.setState({
      running: false,
      elapsed: 0,
      lastTick: 0
    });
  };

  handleLap = () => {
    if (this.state.elapsed !== 0) {
      this.setState(
        {
          laps: [...this.state.laps, this.state.elapsed]
        },
        () => console.log(this.state)
      );
    } else {
      console.log("none");
    }
  };

  format = milliseconds => {
    let totalSec = Math.floor(milliseconds / 1000);
    let min = Math.floor(totalSec / 60);
    let sec = totalSec % 60;
    let mSec = milliseconds % 1000;
    let fmSec;
    // console.log(milliseconds, totalSec, min, sec, mSec, fmSec);
    if (mSec > 9) {
      if (mSec > 99) {
        fmSec = `${mSec}`;
      } else {
        fmSec = `0${mSec}`;
      }
    } else {
      fmSec = `00${mSec}`;
    }

    return `${min > 9 ? min : "0" + min} : ${
      sec > 9 ? sec : "0" + sec
    } : ${fmSec}`;
  };

  handleClearLaps = () => {
    this.setState({
      laps: []
    });
  };

  render() {
    let time = this.format(this.state.elapsed);
    let laps = this.state.laps.map(v => <li key={v}> {this.format(v)}</li>);
    return (
      <div>
        <nav className="Nav">
          <button href="#" onClick={this.handleStart}>
            Start
          </button>
          <button href="#" onClick={this.handleLap}>
            Lap
          </button>
          <button href="#" onClick={this.handlePause}>
            Pause
          </button>
          <button href="#" onClick={this.handleStop}>
            Stop
          </button>
          <button href="#" onClick={this.handleClearLaps}>
            Clear Laps
          </button>
        </nav>
        <div className="Stopwatch">{time}</div>
        <ul className="results">{laps}</ul>
      </div>
    );
  }
}

export default Stopwatch;
