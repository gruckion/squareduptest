import { API } from 'aws-amplify';
import { WeatherLocation, WeatherModel } from './models/weather';

class WeatherApi {
    private readonly apiName = "weatherapi";
    private readonly weatherApiPath = "/weather";
    private readonly weatherLocationApiPath = "/location";

    public async getWeatherData(woeid: number): Promise<WeatherModel | null> {
        try {
            const response = await API.get(this.apiName, this.weatherApiPath, {
                queryStringParameters: {
                    woeid
                }
            });
            return response;
        } catch (exception) {
            console.error(exception);
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
            console.log("response: ", response);
            return response;
        } catch (exception) {
            console.error(exception);
            return null;
        }
    }
}

export const weatherApi = new WeatherApi();
