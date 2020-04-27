import React from "react";
import { App } from "./App";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { Weather } from "./weather/components";
import { ThemeProvider } from "@material-ui/core";
import { ToastContainer } from "react-toastify";

describe("App component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("contains ThemeProvider component", () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(ThemeProvider)).toHaveLength(1);
    });

    it("contains ToastContainer component", () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(ToastContainer)).toHaveLength(1);
    });

    it("contains Weather component", () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Weather)).toHaveLength(1);
    });
});
