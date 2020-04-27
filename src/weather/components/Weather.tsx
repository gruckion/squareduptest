import React from "react";
import { weatherApi } from "../weatherApi";
import { WeatherModel, WeatherRow, ConsolidatedWeather } from "../models/weather";
import { Fab } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { WeatherContainer, WeatherInfo, WeatherOverview, WeatherLocations } from ".";
import { Progress } from "../../progress";
import "../styles/weather.scss";

const buildWeatherTable = (consolidated_weather: ConsolidatedWeather[]) => {
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return consolidated_weather.map<WeatherRow>(c => ({
        day: days[(new Date(c.applicable_date)).getDay()],
        max_temperature: c.max_temp,
        min_temperature: c.min_temp,
        stateAbbreviation: c.weather_state_abbr,
        state: c.weather_state_name
    }));
};

const Weather = () => {

    const [currentWoeid, setCurrentWoeid] = React.useState<number>(-1);
    const [weather, setWeather] = React.useState<WeatherModel | null>(null);
    const [weatherRows, setWeatherRows] = React.useState<WeatherRow[]>([]);

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
    };

    const onChooseLocation = (woeid: number) => {
        setCurrentWoeid(woeid);
    };

    const resetSelectedCity = () => {
        setCurrentWoeid(-1);
        setWeather(null);
        setWeatherRows([]);
    };

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
                    <WeatherLocations
                        onChooseLocation={onChooseLocation}
                    />
                </WeatherContainer>
                : weather && weatherRows && weatherRows.length > 0 ?
                    <WeatherContainer>
                        <WeatherInfo title={weather.title} weatherRows={weatherRows} />
                    </WeatherContainer>
                    : <Progress />
            }

            {}
        </div>
    );
};

export { Weather };
