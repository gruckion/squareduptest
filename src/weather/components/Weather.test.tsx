import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import { Weather, WeatherIllistration, WeatherContainer, WeatherLocations, WeatherInfo } from ".";
import { FabClose } from "../../fabButton/components/FabClose";
import { Progress } from "../../progress";

describe("Weather component", () => {
    it("contains FabClose component", () => {
        const wrapper = shallow(<Weather />);
        expect(wrapper.find(FabClose)).toHaveLength(1);
    });

    it("contains WeatherIllistration component", () => {
        const wrapper = shallow(<Weather />);
        expect(wrapper.find(WeatherIllistration)).toHaveLength(1);
    });

    it("contains WeatherContainer component", () => {
        const wrapper = shallow(<Weather />);
        expect(wrapper.find(WeatherContainer)).toHaveLength(1);
    });

    it("contains WeatherLocations component", () => {
        const wrapper = shallow(<Weather />);
        expect(wrapper.find(WeatherLocations)).toHaveLength(1);
    });
});
