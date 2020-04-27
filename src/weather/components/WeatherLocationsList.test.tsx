import React from "react";
import { WeatherLocationsList } from ".";
import { shallow } from "enzyme";
import { WeatherLocation } from "../models/weather";
import List from "@material-ui/core/List";
import { ListItem } from "@material-ui/core";

describe("WeatherLocationsList component", () => {
    const weatherLocations: WeatherLocation[] = [
        {
            title: "title",
            location_type: "location_type",
            woeid: 42,
            latt_long: "latt_long"
        },
        {
            title: "title2",
            location_type: "location_type2",
            woeid: 43,
            latt_long: "latt_long2"
        }
    ];
    const onChooseLocation = jest.fn();

    it("contains a List component", () => {
        const wrapper = shallow(<WeatherLocationsList weatherLocations={[] as WeatherLocation[]} onChooseLocation={jest.fn()} />);
        expect(wrapper.find(List)).toHaveLength(1);
    });

    it("contains multiple ListItem components", () => {
        const wrapper = shallow(<WeatherLocationsList weatherLocations={weatherLocations} onChooseLocation={jest.fn()} />);
        expect(wrapper.find(List).find(ListItem)).toHaveLength(2);
    });

    it("contains clickable ListItem components", () => {
        const wrapper = shallow(<WeatherLocationsList weatherLocations={weatherLocations} onChooseLocation={onChooseLocation} />);
        wrapper.find(List).find(ListItem).first().simulate('click');
        expect(onChooseLocation.mock.calls.length).toEqual(1);
    });


    //click on ListItem check for event emmitted

});
