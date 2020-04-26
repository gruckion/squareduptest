import { API } from 'aws-amplify';
import { RootWeatherObject } from './models/weather';

class WeatherApi {
    private readonly apiName = "weatherapi";
    private readonly weatherApiPath = "/weather";
    private readonly weatherLocationApiPath = "/location";

    public async getWeatherData(woeiud: number): Promise<RootWeatherObject | null> {
        try {
            const response = await API.get(this.apiName, this.weatherApiPath, {
                queryStringParameters: {
                    woeiud
                }
            });
            return response;
        } catch (exception) {
            console.error(exception);
            return null;
        }
    }

    public async getLocationData(query: string): Promise<RootWeatherObject | null> {
        try {
            const response = await API.get(this.apiName, this.weatherLocationApiPath, {
                queryStringParameters: {
                    query
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
