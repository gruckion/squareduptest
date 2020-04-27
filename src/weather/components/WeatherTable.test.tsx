import React from "react";
import { WeatherTable } from ".";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import TableRow from "@material-ui/core/TableRow";
import { WeatherRow } from "../models/weather";
import { TableBody, TableCell } from "@material-ui/core";

describe("WeatherTable component", () => {
    const weatherRows: WeatherRow[] = [
        {
            day: 'day',
            max_temperature: 42,
            min_temperature: 1,
            stateAbbreviation: 'stateAbbreviation',
            state: 'state',
        },
        {
            day: 'day2',
            max_temperature: 42,
            min_temperature: 1,
            stateAbbreviation: 'stateAbbreviation',
            state: 'state',
        }]

    it("contains multiple TableRow components", () => {
        const wrapper = shallow(<WeatherTable weatherRows={weatherRows} />);
        expect(wrapper.find(TableBody).find(TableRow)).toHaveLength(2);
    });

    it("contains populated TableCell components for a TableRow", () => {
        const wrapper = shallow(<WeatherTable weatherRows={weatherRows} />);
        expect(wrapper.find(TableBody).find(TableRow).find(TableCell).at(0).text()).toBe(weatherRows[0].day);
        expect(wrapper.find(TableBody).find(TableRow).find(TableCell).at(1).text()).toBe(weatherRows[0].max_temperature.toString());
        expect(wrapper.find(TableBody).find(TableRow).find(TableCell).at(2).text()).toBe(weatherRows[0].min_temperature.toString());
    });
});
