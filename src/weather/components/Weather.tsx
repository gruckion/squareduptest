import React from 'react';
import { weatherApi } from '../weatherApi';
import { WeatherModel } from '../models/weather';

const Weather = () => {

    const [weather, setWeather] = React.useState<WeatherModel[] | null>(null);

    React.useEffect(() => {
        (async () => {
            setWeather(await weatherApi.get());
        })();
    }, []);

    return (
        <div>
            Hello world
            {weather && weather.map(w => (<>
                <div>{w.temperature}</div>
                <div>{w.location}</div>
            </>))}
        </div>
    )
};

export { Weather };