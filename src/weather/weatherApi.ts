import { API } from 'aws-amplify';
import { RootWeatherObject } from './models/weather';

class WeatherApi {
    private readonly apiName = "weatherapi";
    private readonly apiPath = "/weather";

    public async get(): Promise<RootWeatherObject | null> {
        try {
            // TODO: (Stephen) process the woeid param
            const response = await API.get(this.apiName, this.apiPath, {
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
