import React from 'react';
import { weatherApi } from '../weatherApi';
import { WeatherModel, WeatherRow, ConsolidatedWeather, WeatherLocation } from '../models/weather';
import { Fab } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { WeatherContainer, WeatherInfo, WeatherOverview, WeatherLocationsList } from '.';
import { Progress } from '../../progress';
import "../styles/weather.scss";
import { debounceDelay } from '../../common/constants';

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
    const [currentWoeid, setCurrentWoeid] = React.useState<number>(-1);
    const [weather, setWeather] = React.useState<WeatherModel | null>(null);
    const [weatherRows, setWeatherRows] = React.useState<WeatherRow[]>([]);
    const [weatherLocationRows, setWeatherLocationRows] = React.useState<WeatherLocation[]>([]);

    React.useEffect(() => {
        (async () => {
            if(currentWoeid !== -1) {
                const weatherData = await weatherApi.getWeatherData(currentWoeid);
                setWeather(weatherData);

                if(weatherData !== null && weatherData.consolidated_weather !== null) {
                    setWeatherRows(buildWeatherTable(weatherData.consolidated_weather));
                }
            }
        })();
    }, [currentWoeid]);

    const onChangeLocation = () => {
        resetSelectedCity();
    }

    const debounceLocationData = debounce(async (locationName: string) => {
        const locationData = await weatherApi.getLocationData(locationName);
        if (locationData !== null) {
            setWeatherLocationRows(locationData);
        }
        setLocationName(locationName);
   }, debounceDelay);

    const onChangeLocationName = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const locationName = e.target.value;
        await debounceLocationData(locationName);
    }

    const onChooseLocation = (woeid: number) => {
        setCurrentWoeid(woeid);
        resetLocationSearch();
    }

    const resetSelectedCity = () => {
        setCurrentWoeid(-1);
        setWeather(null);
        setWeatherRows([]);
    }

    const resetLocationSearch = () => {
        setWeatherLocationRows([]);
        setLocationName('');
    }

    return (
        <div className="container">
            <div className="float-add">
                {currentWoeid !== -1 &&
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
                {currentWoeid === -1 ?
                    <WeatherContainer>
                        <>
                            <input type="text" placeholder="Search" onChange={onChangeLocationName} />
                            {weatherLocationRows && weatherLocationRows.length > 0 ?
                                <WeatherLocationsList weatherLocations={weatherLocationRows} onChooseLocation={onChooseLocation} />
                                : <><br /><br /><br /></>}
                        </>
                    </WeatherContainer>
                    : weather && weatherRows && weatherRows.length > 0 ?
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