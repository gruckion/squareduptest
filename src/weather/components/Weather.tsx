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
        const saveWoeid = localStorage.getItem('woeid');
        if(saveWoeid) {
            setCurrentWoeid(parseInt(saveWoeid));
        }

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
        localStorage.setItem('woeid', woeid.toString());
        setCurrentWoeid(woeid);
    };

    const resetSelectedCity = () => {
        localStorage.removeItem('woeid');
        setCurrentWoeid(-1);
        setWeatherRows([]);
    };

    const renderWeatherContent = (): JSX.Element => {
        if (currentWoeid === -1) {
            return ( <WeatherLocations onChooseLocation={onChooseLocation} />);
        } else if (weatherRows && weatherRows.length > 0) {
            return (<WeatherInfo title={title} weatherRows={weatherRows} />);
        } else {
            return (<Progress />);
        }
    }

    return (
        <div className="container">
            <FabClose currentWoeid={currentWoeid} onChangeLocation={onChangeLocation} />
            <WeatherIllistration weatherRows={weatherRows} temperature={temperature}/>
            <WeatherContainer>
                {renderWeatherContent()}
            </WeatherContainer>
        </div>
    );
};

export { Weather };
