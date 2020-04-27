import { API } from "aws-amplify";
import { WeatherLocation, WeatherModel, ConsolidatedWeather, WeatherRow, WeatherData } from "./models/weather";
import { error } from "../toast";

class WeatherApi {
    private readonly apiName = "weatherapi";
    private readonly weatherApiPath = "/weather";
    private readonly weatherLocationApiPath = "/location";

    public async getWeatherData(woeid: number): Promise<WeatherData | null> {
        try {
            const response: WeatherModel = await API.get(this.apiName, this.weatherApiPath, {
                queryStringParameters: {
                    woeid
                }
            });

            return {
                title: response.title,
                temperature: response.consolidated_weather[0].the_temp,
                weatherRows: this.parseWeatherData(response.consolidated_weather)
            };
        } catch (exception) {
            error("Error fetching Weather Data");
            return null;
        }
    }

    public async getLocationData(location: string): Promise<WeatherLocation[] | null> {
        try {
            const response = await API.get(this.apiName, this.weatherLocationApiPath, {
                queryStringParameters: {
                    location
                }
            });
            return response;
        } catch (exception) {
            error("Error fetching Weather Data");
            return null;
        }
    }

    public parseWeatherData(consolidated_weather: ConsolidatedWeather[]): WeatherRow[] {
        const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        return consolidated_weather.map<WeatherRow>(c => ({
            day: days[(new Date(c.applicable_date)).getDay()],
            max_temperature: c.max_temp,
            min_temperature: c.min_temp,
            stateAbbreviation: c.weather_state_abbr,
            state: c.weather_state_name
        }));
    };
}

export const weatherApi = new WeatherApi();
