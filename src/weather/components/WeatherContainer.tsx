import React from "react";
import weatherCurves from "../images/weather-curves.svg";

interface WeatherContainerProps {
    children: React.ReactChild;
}

const WeatherContainer: React.FunctionComponent<WeatherContainerProps> = ({ children }) => {
    return (
        <div className="weather-info-wrapper">
            <div className="weather-svg-container">
                <img src={weatherCurves} alt="weather curves" />
            </div>
            <div className="weather-info-container">
                {children}
            </div>
        </div>
    );
};

export { WeatherContainer };
