import React, { Component } from "react";
class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.laps = [];
    this.reset();
  }
  state = {
    running: false,
    times: 0,
    output: "00:00:00"
  };

  reset() {
    this.times = [0, 0, 0];
  }

  start = () => {
    if (!this.state.running) {
      if (this.state.output === "00:00:00") {
        console.log("first", Date.now());
        this.setState(
          {
            running: true,
            times: Date.now()
          },
          function() {
            if (this.state.running) this.step(this.state.times);
            console.log("second", Date.now());
            console.log("third", this.state.times);
          }
        );
      } else {
        this.setState(
          {
            running: true,
            times: Date.now()
          },
          function() {
            if (this.state.running) this.step(this.state.times);
          }
        );
      }
    }
  };

  lap() {
    let times = this.times;
    let li = document.createElement("li");
    li.innerText = this.format(times);
    this.results.appendChild(li);
  }

  stop = () => {
    this.setState({
      running: false,
      times: 0,
      output: "00:00:00"
    });
  };

  pause = () => {
    this.setState({
      running: false,
      times: Date.now()
    });
  };

  restart = () => {
    if (!this.running) {
      this.setState(
        {
          running: true,
          times: Date.now()
        },
        function() {
          this.step(this.state.times);
        }
      );
    }
  };

  // clear() {
  //   clearChildren(this.results);
  // }

  step = timestamp => {
    if (this.state.running) {
      // if (!this.running) return;
      this.calculate(timestamp);

      // this.time = timestamp;
      this.setState({
        times: timestamp
      });

      this.print();
      requestAnimationFrame(this.step);
    }
  };

  calculate = timestamp => {
    var diff = timestamp - this.state.times;
    // Hundredths of a second are 100 ms
    this.times[2] += diff / 10;
    // Seconds are 100 hundredths of a second
    if (this.times[2] >= 100) {
      this.times[1] += 1;
      this.times[2] -= 100;
    }
    // Minutes are 60 seconds
    if (this.times[1] >= 60) {
      this.times[0] += 1;
      this.times[1] -= 60;
    }
  };

  print = () => {
    this.setState({
      output: this.format(this.times)
    });
  };

  format = times => {
    return `\
      ${this.pad0(times[0], 2)}:\
      ${this.pad0(times[1], 2)}:\
      ${this.pad0(Math.floor(times[2]), 2)}`;
  };

  pad0 = (value, count) => {
    var result = value.toString();
    for (; result.length < count; --count) result = "0" + result;
    return result;
  };

  clearChildren = node => {
    while (node.lastChild) node.removeChild(node.lastChild);
  };

  render() {
    return (
      <div>
        <nav className="Nav">
          <button href="#" onClick={this.start}>
            Start
          </button>
          <button href="#" onClick={this.lap}>
            Lap
          </button>
          <button href="#" onClick={this.pause}>
            Pause
          </button>
          <button href="#" onClick={this.stop}>
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
