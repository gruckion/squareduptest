import React from "react";
import { WeatherLocationsList } from '.';
import { WeatherLocation } from "../models/weather";
import { debounceDelay } from '../../common/constants';
import { weatherApi } from '../weatherApi';
var debounce = require('lodash.debounce');

interface WeatherLocationsProps {
    onChooseLocation: (woeid: number) => void;
}

const WeatherLocations: React.FunctionComponent<WeatherLocationsProps> = ({ onChooseLocation }) => {

    const [weatherLocationRows, setWeatherLocationRows] = React.useState<WeatherLocation[]>([]);

    const debounceLocationData = debounce(async (locationName: string) => {
        const locationData = await weatherApi.getLocationData(locationName);
        if (locationData !== null) {
            setWeatherLocationRows(locationData);
        }
   }, debounceDelay);

    const onChangeLocationName = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const locationName = e.target.value;
        if (locationName.length === 0) {
            setWeatherLocationRows([]);
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
        <>
        <input type="text" placeholder="Search" onChange={onChangeLocationName} />
        <div className="">

        </div>
        {weatherLocationRows && weatherLocationRows.length > 0 ?
            <WeatherLocationsList weatherLocations={weatherLocationRows} onChooseLocation={onChooseLocationChild} />
            : <div>Enter a search term</div>}
    </>);
}

export { WeatherLocations };