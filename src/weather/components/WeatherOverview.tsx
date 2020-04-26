import React from "react";

interface WeatherOverviewProps {
    weatherStateName: string;
    temperature: number;
}

const WeatherOverview: React.FunctionComponent<WeatherOverviewProps> = ({weatherStateName, temperature }) => {
    return (
        <React.Fragment>
            <div className="weather-illistration--state-name">{weatherStateName}</div>
            <div className="weather-illistration--temperature">{temperature}&#176;</div>
        </React.Fragment>
    );
}

export { WeatherOverview }