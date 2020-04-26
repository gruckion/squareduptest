import React from "react";
import { WeatherTable } from ".";
import { WeatherRow } from '../models/weather';

interface WeatherInfoProps {
    title: string;
    weatherRows: WeatherRow[];
}

const WeatherInfo: React.FunctionComponent<WeatherInfoProps> = ({title, weatherRows}) => {
    return (
        <>
            < div className="weather-info-container--title">{title}</div>
            <WeatherTable weatherRows={weatherRows}/>
        </>
    );
}

export { WeatherInfo };