import React from "react";
import { WeatherLocationsList } from '.';
import { WeatherLocation } from "../models/weather";
import { debounceDelay } from '../../common/constants';
import { weatherApi } from '../weatherApi';
import "../styles/weather-locations.scss"
import { Progress } from "../../progress";
var debounce = require('lodash.debounce');

interface WeatherLocationsProps {
    onChooseLocation: (woeid: number) => void;
}

const WeatherLocations: React.FunctionComponent<WeatherLocationsProps> = ({ onChooseLocation }) => {

    const [weatherLocationRows, setWeatherLocationRows] = React.useState<WeatherLocation[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    const debounceLocationData = debounce(async (locationName: string) => {
        const locationData = await weatherApi.getLocationData(locationName);
        if (locationData !== null) {
            setWeatherLocationRows(locationData);
        }
        setLoading(false);
    }, debounceDelay);

    const onChangeLocationName = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        const locationName = e.target.value;
        if (locationName.length === 0) {
            setWeatherLocationRows([]);
            setLoading(false);
            return;
        }
        await debounceLocationData(locationName);
    }

    const resetLocationSearch = () => {
        setWeatherLocationRows([]);
    }

    const onChooseLocationChild = (woeid: number) => {
        onChooseLocation(woeid);
        resetLocationSearch();
    }

    return (
        <div className="locations-container">
            <input className="locations-input" type="text" placeholder="Search" onChange={onChangeLocationName} />

            { !!weatherLocationRows &&
                <div className="locations-instructions-text">Enter a City to display weather data.</div>}

            {loading &&
                <Progress />}

            {weatherLocationRows && weatherLocationRows.length > 0 &&
                <WeatherLocationsList weatherLocations={weatherLocationRows} onChooseLocation={onChooseLocationChild} /> }

        </div>);
}

export { WeatherLocations };