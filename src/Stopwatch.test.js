import React from "react";
import ReactDOM from "react-dom";
import Stopwatch from "./Stopwatch";
import { configure } from "enzyme";
import { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const wrapper = shallow(<Stopwatch />);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Stopwatch />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Stopwatch Component:", () => {
  describe("must include basic JSX:", () => {
    // describe("must to equil to snapshot", () => {
    //   expect(result).toMatchSnapshot();
    // });
  });

  describe("must have a basic initial state:", () => {
    describe("running — boolean property, describing the state of stopwatch", () => {
      test("must exist", () => {
        expect(wrapper.state("running")).toBeDefined();
      });
      test("must have false as the initial value", () => {
        expect(wrapper.state("running")).toBe(false);
      });
    });
    describe("TimeDifference — time difference between now and last call of tick function", () => {
      test("must exist", () => {
        expect(wrapper.state("TimeDifference")).toBeDefined();
      });
      test("must have 0 as the initial value", () => {
        expect(wrapper.state("TimeDifference")).toBe(0);
      });
    });
    describe("lastTick — last value of tick function (Date.now())", () => {
      test("must exist", () => {
        expect(wrapper.state("lastTick")).toBeDefined();
      });
      test("must have 0 as the initial value", () => {
        expect(wrapper.state("lastTick")).toBe(0);
      });
    });
  });

  // describe("must contain the basic class methods implemented through the arrow methods (class properties)", () => {
  //   afterAll(() => {
  //     jest.clearAllMocks();
  //   });
  //   describe("format", () => {
  //     test("must calculate values from a given number of milliseconds and return a string in the format '00 : 00 : 000'", () => {
  //       expect(wrapper.instance().format(2742)).toBe("00 : 02 : 742");
  //     });
  //   });

  //   describe("tick", () => {
  //     afterAll(() => {
  //       jest.clearAllMocks();
  //     });

  //     test("должен менять свойство state.newTaskMessage текстовым контентом, будучи вызванным в качестве обработчика события onChange", () => {
  //       result.instance()._updateNewTaskMessage({
  //         target: {
  //           value: testMessage1
  //         }
  //       });

  //       expect(result.state("newTaskMessage")).toBe(testMessage1);
  //     });
  //   });
  // });

  // describe("mudst be valid", () => {
  //   let mockFetch = jest.fn();
  //   test("mudst be valid", () => {
  //     const spy = jest
  //       .spyOn(Stopwatch.prototype, "componentWillUnmount")
  //       .and.callThrough();
  //     expect(wrapper).toBeDefined();
  //     expect(Stopwatch.prototype.componentWillMount).toHaveBeenCalledTimes(1);
  //   });
  // });

  // it("must be valid ", () => {
  //   spyOn(Stopwatch.prototype, "componentWillUnmount").and.callThrough();

  //   expect(wrapper).toBeDefined();
  //   expect(Stopwatch.prototype.componentWillMount).toHaveBeenCalledTimes(1);
  // });
});
