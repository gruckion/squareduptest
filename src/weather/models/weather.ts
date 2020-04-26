export interface ConsolidatedWeather {
    id: any;
    weather_state_name: string;
    weather_state_abbr: string;
    wind_direction_compass: string;
    created: Date;
    applicable_date: string;
    min_temp: number;
    max_temp: number;
    the_temp: number;
    wind_speed: number;
    wind_direction: number;
    air_pressure: number;
    humidity: number;
    visibility: number;
    predictability: number;
}

export interface Parent {
    title: string;
    location_type: string;
    woeid: number;
    latt_long: string;
}

export interface Source {
    title: string;
    slug: string;
    url: string;
    crawl_rate: number;
}

export interface WeatherModel {
    consolidated_weather: ConsolidatedWeather[];
    time: Date;
    sun_rise: Date;
    sun_set: Date;
    timezone_name: string;
    parent: Parent;
    sources: Source[];
    title: string;
    location_type: string;
    woeid: number;
    latt_long: string;
    timezone: string;
}

export interface RootWeatherObject {
    success: string;
    url: string;
    weather: WeatherModel;
}

export interface WeatherRow {
    day: string;
    max_temperature: number;
    min_temperature: number;
    stateAbbreviation: string;
    state: string
}