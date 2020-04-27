import React from "react";
import { weatherApi } from "../weatherApi";
import { WeatherRow } from "../models/weather";
import { Fab } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { WeatherContainer, WeatherInfo, WeatherOverview, WeatherLocations } from ".";
import { Progress } from "../../progress";
import "../styles/weather.scss";

const Weather = () => {

    const [currentWoeid, setCurrentWoeid] = React.useState<number>(-1);
    const [weatherRows, setWeatherRows] = React.useState<WeatherRow[]>([]);
    const [temperature, setTemperature] = React.useState<number>(-1);
    const [title, setTitle] = React.useState<string>('');

    React.useEffect(() => {
        (async () => {
            if(currentWoeid !== -1) {
                const weatherData = await weatherApi.getWeatherData(currentWoeid);

                if(weatherData !== null ) {
                    setTemperature(weatherData.temperature);
                    setTitle(weatherData.title);

                    if (weatherData.weatherRows !== null) {
                        setWeatherRows(weatherData.weatherRows);
                    }
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
                {weatherRows && weatherRows.length > 0 &&
                    <WeatherOverview
                        weatherStateName={weatherRows[0].state}
                        temperature={Math.round(temperature)}
                    />}
            </div>
            {currentWoeid === -1 ?
                <WeatherContainer>
                    <WeatherLocations
                        onChooseLocation={onChooseLocation}
                    />
                </WeatherContainer>
                : weatherRows && weatherRows.length > 0 ?
                    <WeatherContainer>
                        <WeatherInfo title={title} weatherRows={weatherRows} />
                    </WeatherContainer>
                    : <Progress />
            }

            {}
        </div>
    );
};

export { Weather };
