import React from "react";
import { WeatherRow } from "../models/weather";
import { WeatherOverview } from ".";
import "../styles/weather-illistration.scss";

interface WeatherIllistrationProps {
    weatherRows: WeatherRow[];
    temperature: number;
}

const WeatherIllistration: React.FunctionComponent<WeatherIllistrationProps> = ({ weatherRows, temperature }) => {
    if (weatherRows && weatherRows.length === 0) {
        return null;
    }

    return (
        <div className="weather-illistration">
            {weatherRows && weatherRows.length > 0 &&
                <WeatherOverview
                    weatherStateName={weatherRows[0].state}
                    temperature={Math.round(temperature)}
                />}
        </div>

    )
};

export { WeatherIllistration };