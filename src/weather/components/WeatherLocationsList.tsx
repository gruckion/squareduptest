import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { WeatherLocation } from "../models/weather";
import "../styles/weather-locations-list.scss";

interface WeatherTableProps {
    weatherLocations: WeatherLocation[];
    onChooseLocation: (woeid: number) => void;
}

const WeatherLocationsList: React.FunctionComponent<WeatherTableProps> = ({ weatherLocations, onChooseLocation }) => {
    return (
        <List className="locations-list">
            {weatherLocations.map((row: WeatherLocation) => (
                // eslint-disable-next-line react/jsx-no-bind
                <ListItem component="a" button key={row.latt_long} onClick={() => onChooseLocation(row.woeid)}>
                    {row.title}
                </ListItem>
            ))}
        </List>
    );
};

export { WeatherLocationsList };
