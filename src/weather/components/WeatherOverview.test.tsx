import React from "react";
import { WeatherOverview } from ".";
import { shallow } from "enzyme";

describe("WeatherOverview component", () => {
    const weatherStateName = "Bob Ross";
    const temperature: number = 42;

    it("contains state-name div with correct state name text", () => {
        const wrapper = shallow(<WeatherOverview weatherStateName={weatherStateName} temperature={0} />);
        expect(wrapper.find('div.weather-illistration--state-name').text()).toBe(weatherStateName);
    });

    it("contains temperature div with correct temperature text", () => {
        const wrapper = shallow(<WeatherOverview weatherStateName={''} temperature={temperature} />);
        expect(wrapper.find('div.weather-illistration--temperature').text()).toBe(`${temperature}°`);
    });

});
