import React from 'react';
import { weatherApi } from '../weatherApi';
import { WeatherModel, WeatherRow, ConsolidatedWeather } from '../models/weather';
import { Fab } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { WeatherContainer, WeatherInfo, WeatherOverview } from '.';
import { Progress } from '../../progress';
import "../styles/weather.scss";

var debounce = require('lodash.debounce');

const buildWeatherTable = (consolidated_weather: ConsolidatedWeather[]) => {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return consolidated_weather.map<WeatherRow>(c => ({
        day: days[(new Date(c.applicable_date)).getDay()],
        max_temperature: c.max_temp,
        min_temperature: c.min_temp,
        stateAbbreviation: c.weather_state_abbr,
        state: c.weather_state_name
    }));
};

const Weather = () => {

    const [locationName, setLocationName] = React.useState<string>('');
    const [currentWoeiud, setCurrentWoeiud] = React.useState<number>(-1);
    const [weather, setWeather] = React.useState<WeatherModel | null>(null);
    const [weatherRows, setWeatherRows] = React.useState<WeatherRow[]>([]);

    // React.useEffect(() => {
    //     (async () => {
    //         console.log('locationData: ', locationData);
    //     })();
    // }, [currentWoeiud, locationName]);

    React.useEffect(() => {
        (async () => {
            if(currentWoeiud !== -1) {
                const weatherData = await weatherApi.getWeatherData(currentWoeiud);
                setWeather(weatherData?.weather || null);

                if(weatherData !== null && weatherData.weather.consolidated_weather !== null) {
                    setWeatherRows(buildWeatherTable(weatherData?.weather.consolidated_weather));
                }
            }
        })();
    }, [currentWoeiud]);

    const onChangeLocation = () => {
        setCurrentWoeiud(-1);
        setWeather(null);
        setWeatherRows([]);
    }

    const onChangeLocationName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocationName(e.target.value);
    }

    return (
        <div className="container">
            <div className="float-add">
                {currentWoeiud !== -1 &&
                    <Fab color="default" aria-label="add" onClick={onChangeLocation}>
                            <CloseIcon htmlColor="rgb(101, 123, 61)" />
                    </Fab>}
            </div>
            <div className="weather-illistration">
                {weather &&
                    <WeatherOverview
                        weatherStateName={weather.consolidated_weather[0].weather_state_name}
                        temperature={Math.round(weather.consolidated_weather[0].the_temp)}
                    />}
            </div>


                {currentWoeiud === -1 ?
                    <WeatherContainer>
                        <>
                            <input type="text" value={locationName} placeholder="Enter City" onChange={onChangeLocationName} />
                            {locationName}
                            <br />
                            <br />
                            <br />
                        </>
                    </WeatherContainer>
                    : weather && weatherRows ?
                    <WeatherContainer>
                        <WeatherInfo title={weather.title} weatherRows={weatherRows} />
                    </WeatherContainer>
                    : <Progress />
                }

              {}
        </div>
    )
};

export { Weather };