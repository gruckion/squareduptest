import { API } from 'aws-amplify';
import { WeatherModel } from './models/weather';

class WeatherApi {
    private readonly apiName = "weatherapi";
    private readonly apiPath = "/weather";

    public async get(): Promise<WeatherModel[] | null> {
        try {
            const response = await API.get(this.apiName, this.apiPath, {});
            return response.weather;
        } catch (exception) {
            console.error(exception);
            return null;
        }
    }
}

export const weatherApi = new WeatherApi();
