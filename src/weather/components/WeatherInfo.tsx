import React from "react";
import { WeatherTable } from ".";
import { WeatherRow } from '../models/weather';

interface WeatherInfoProps {
    title: string;
    weatherRowData: WeatherRow[];
}

const WeatherInfo: React.FunctionComponent<WeatherInfoProps> = ({title, weatherRowData}) => {
    return (
        <>
            < div className="weather-info-container--title">{title}</div>
            <WeatherTable weatherRowData={weatherRowData}/>
        </>
    );
}

export { WeatherInfo };