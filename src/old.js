import React, { Component } from "react";
class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 0, running: false };
  }
  onStart = () => {
    if (!this.state.running) {
      this.startTime = +performance.now();
      console.log(+performance.now());
      this.setState(
        {
          running: true
        },
        function() {
          console.log(this.state.running);
          this.tick();
        }
      );
    }
  };
  onPause = () => {
    if (this.state.running) {
      this.setState({
        running: false
      });
      this.update(false);
    }
    console.log(this.state.running);
  };
  onStop = () => {
    if (!this.state.running) {
      this.startTime = +performance.now();
      this.tick();
    } else {
      this.update(false);
      clearTimeout(this.timeout);
    }
  };
  tick = () => {
    if (this.state.running) {
      this.update(true);
      this.timeout = setTimeout(this.tick);
    }
  };
  update(running) {
    this.setState({
      time: +performance.now() - this.startTime,
      running
    });
  }
  render() {
    return (
      <div className="stopwatch">
        <StopwatchDisplay time={this.state.time} />
        <StopwatchControls
          onStart={this.onStart}
          onPause={this.onPause}
          onStop={this.onStop}
        />
      </div>
    );
  }
}

function padNumber(value) {
  return value > 9 ? String(value) : "0" + value;
}

function StopwatchDisplay({ time }) {
  const h = padNumber(Math.floor(time / 3600000));
  const m = padNumber(Math.floor(time / 60000) % 60);
  const s = padNumber(Math.floor(time / 1000) % 60);
  const c = padNumber(Math.round(time / 10) % 100);
  return (
    <p>
      {h}:{m}:{s}.<small>{c}</small>
    </p>
  );
}

function StopwatchControls({ onStart, onPause, onStop }) {
  return (
    <nav className="Nav">
      <button onClick={onStart}>Start</button>
      <br />
      <button onClick={onPause}>Pause</button>
      <br />
      <button onClick={onStop}>Stop</button>
    </nav>
  );
}

export default Stopwatch;
