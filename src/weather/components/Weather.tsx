import React from "react";
import { weatherApi } from "../weatherApi";
import { WeatherRow } from "../models/weather";
import { WeatherContainer, WeatherInfo, WeatherLocations, WeatherIllistration } from ".";
import { Progress } from "../../progress";
import "../styles/weather.scss";
import { FabClose } from "../../fabButton/components/FabClose";

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
            <FabClose currentWoeid={currentWoeid} onChangeLocation={onChangeLocation} />
            <WeatherIllistration weatherRows={weatherRows} temperature={temperature}/>
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
                    : <WeatherContainer><Progress /></WeatherContainer>
            }
        </div>
    );
};

export { Weather };
