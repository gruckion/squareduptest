import React from 'react';
import { weatherApi } from '../weatherApi';
import { WeatherModel } from '../models/weather';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import { WeatherTable } from '.';
import "../styles/weather.scss";

const Weather = () => {

    const [weather, setWeather] = React.useState<WeatherModel | null>(null);

    React.useEffect(() => {
        (async () => {
            const response = await weatherApi.get();
            setWeather(response?.weather || null);
        })();
    }, []);

    // if(!weather) {
    //     return (<div>No Content</div>)
    // }

    return (
        <div className="container">
            <div className="float-add">
                <Fab color="default" aria-label="add">
                    <AddIcon htmlColor="rgb(101, 123, 61)" />
                </Fab>
            </div>
            <div className="weather-illistration">
                {weather ?
                    (<React.Fragment>
                        <div className="weather-illistration--state-name">{weather.consolidated_weather[0].weather_state_name}</div>
                        <div className="weather-illistration--temperature">{Math.round(weather.consolidated_weather[0].the_temp)}&#176;</div>
                    </React.Fragment>)
                    : <div>Loading</div>}
            </div>
            <div className="weather-info-wrapper">
                <div className="weather-svg-container">
                    <svg className="weather-info-svg-curve" viewBox="0 0 1440 300">
                        <path
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
                    {weather ?
                        < div className="weather-info-container--title">{weather?.title}</div>
                        : <div>Loading</div>
                    }
                    <WeatherTable />
                </div>
            </div>
        </div>
    )
};

export { Weather };