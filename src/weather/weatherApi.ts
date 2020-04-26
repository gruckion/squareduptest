import { API } from 'aws-amplify';
import { RootWeatherObject } from './models/weather';

class WeatherApi {
    private readonly apiName = "weatherapi";
    private readonly weatherApiPath = "/weather";
    private readonly weatherImageApiPath = "/weatherimage";

    public async getWeatherData(): Promise<RootWeatherObject | null> {
        try {
            const response = await API.get(this.apiName, this.weatherApiPath, {
                queryStringParameters: {
                    woeiud: 44418
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
