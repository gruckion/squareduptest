import React from 'react';
import { weatherApi } from '../weatherApi';
import { WeatherModel, WeatherRow } from '../models/weather';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import { WeatherContainer, WeatherInfo, WeatherOverview } from '.';
import { Progress } from '../../progress';
import "../styles/weather.scss";

const Weather = () => {

    const [weather, setWeather] = React.useState<WeatherModel | null>(null);
    const [weatherRows, setWeatherRows] = React.useState<WeatherRow[]>([]);

    React.useEffect(() => {
        (async () => {
            const weatherData = await weatherApi.getWeatherData();
            setWeather(weatherData?.weather || null);
            var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

            const weatherRowsData = weatherData?.weather.consolidated_weather.map<WeatherRow>(c => ({
                day: days[(new Date(c.applicable_date)).getDay()],
                max_temperature: c.max_temp,
                min_temperature: c.min_temp,
                stateAbbreviation: c.weather_state_abbr,
                state: c.weather_state_name
            }));

            if(weatherRowsData !== undefined) {
                setWeatherRows(weatherRowsData);
            }

        })();
    }, []);

    return (
        <div className="container">
            <div className="float-add">
                <Fab color="default" aria-label="add">
                    <AddIcon htmlColor="rgb(101, 123, 61)" />
                </Fab>
            </div>
            <div className="weather-illistration">
                {weather &&
                    <WeatherOverview
                        weatherStateName={weather.consolidated_weather[0].weather_state_name}
                        temperature={Math.round(weather.consolidated_weather[0].the_temp)}
                    />}
            </div>
            {weather && weatherRows ?
                <WeatherContainer>
                    <WeatherInfo title={weather.title} weatherRows={weatherRows} />
                </WeatherContainer>
                : <Progress />}
        </div>
    )
};

export { Weather };