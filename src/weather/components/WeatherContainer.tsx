import React from "react";

interface WeatherContainerProps {
    children: React.ReactChild;
}

const WeatherContainer: React.FunctionComponent<WeatherContainerProps> = ({ children }) => {
    return (
        <div className="weather-info-wrapper">
        <div className="weather-svg-container">
            <svg className="weather-info-svg-curves" viewBox="0 0 1440 300">
                <path
                    className="weather-info-svg-curves--transparent"
                    fill="#fff"
                    fillOpacity="1"
                    opacity="0.2"
                    transform-origin="center"
                    d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />
                <path
                    fill="#fff"
                    fillOpacity="1"
                    transform="scale (-1, 1) translate(0, 65)"
                    transform-origin="center"
                    d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />
            </svg>
        </div>
        <div className="weather-info-container">
            {children}
        </div>
    </div>
    );
}

export { WeatherContainer };