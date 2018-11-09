import React from "react";
import ReactDOM from "react-dom";
import Stopwatch from "./Stopwatch";
import { configure } from "enzyme";
import { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import renderer from "react-test-renderer";

configure({ adapter: new Adapter() });

const wrapper = shallow(<Stopwatch />);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Stopwatch />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Stopwatch Component:", () => {
  describe("should include basic JSX:", () => {
    describe("should matches the snapshot", () => {
      const tree = renderer.create(<Stopwatch />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("should have an initial state:", () => {
    describe("running — boolean property, describing the state of stopwatch", () => {
      test("property should exist", () => {
        expect(wrapper.state("running")).toBeDefined();
      });
      test("should have false as the initial value", () => {
        expect(wrapper.state("running")).toBe(false);
      });
    });
    describe("TimeDifference — time difference between now and last call of tick function", () => {
      test("property should exist", () => {
        expect(wrapper.state("TimeDifference")).toBeDefined();
      });
      test("should have 0 as the initial value", () => {
        expect(wrapper.state("TimeDifference")).toBe(0);
      });
    });
    describe("lastTick — last value of tick function (Date.now())", () => {
      test("property should exist", () => {
        expect(wrapper.state("lastTick")).toBeDefined();
      });
      test("should have 0 as the initial value", () => {
        expect(wrapper.state("lastTick")).toBe(0);
      });
    });
  });

  describe("should contain class methods implemented through the arrow methods (class properties)", () => {
    afterAll(() => {
      jest.clearAllMocks();
    });
    describe("format method", () => {
      test("should calculate values from a given number of milliseconds and return a string in the format '00 : 00 : 000'", () => {
        expect(wrapper.instance().format(2742)).toBe("00 : 02 : 742");
      });
    });
    describe("handleStartStop", () => {
      test("handleStartStop shoud toggle state.running", () => {
        const startBtn = wrapper.find("button.start");
        startBtn.simulate("click");
        expect(wrapper.state("running")).toBe(true);
        startBtn.simulate("click");
        expect(wrapper.state("running")).toBe(false);
      });
    });
  });

  describe("Should contain lifecycle methods to avoid memory leaks", () => {
    jest.useFakeTimers();
    test("clearInterval should be called on ComponentWillUnmount", () => {
      wrapper.unmount();
      expect(clearInterval).toHaveBeenCalledTimes(1);
    });
  });
});
