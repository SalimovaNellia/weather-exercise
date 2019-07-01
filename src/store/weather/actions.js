import {API_KEY} from "../../utils/constants";
import {groupBy} from "../../utils/groupBy";
import {Temperature} from "../../model/Temperature";
import {Weather} from "../../model/Weather";
import {WeatherData} from "../../model/WeatherData";
import {DayWeather} from "../../model/DayWeather";

export const FETCH_WEATHER_BEGIN   = 'FETCH_WEATHER_BEGIN';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';

export const fetchWeatherBegin = () => ({
    type: FETCH_WEATHER_BEGIN
});

export const fetchWeatherSuccess = weatherList => ({
    type: FETCH_WEATHER_SUCCESS,
    payload: { weatherList }
});

export const fetchWeatherFailure = error => ({
    type: FETCH_WEATHER_FAILURE,
    payload: { error }
});


function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function fetchWeatherData(city, countryCode) {
    return dispatch => {
        dispatch(fetchWeatherBegin());
        return fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${API_KEY}&cnt=40`)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                const groupedDates = groupBy(json.list, item => item.dt_txt.split(" ")[0]);
                    const dayWeatherArray = [];
                    groupedDates.forEach((responseArray, key) => {
                        let convertedWeatherDataList = responseArray.map(item => {
                            let time = item.dt_txt.split(" ")[1];
                            let humidity = item.main.humidity;
                            let description = item.weather[0].description;
                            let pressure = item.main.pressure;
                            let tempValue = item.main.temp;
                            // converting Kelvin to Fahrenheit
                            let temperature = new Temperature("F", (tempValue * 9 / 5 - 459.67).toFixed(2));
                            let weather = new Weather(humidity, description, pressure, temperature);
                            return new WeatherData(time, weather);
                        });
                    dayWeatherArray.push(new DayWeather(key, convertedWeatherDataList));
                });

                dispatch(fetchWeatherSuccess(dayWeatherArray));
                return dayWeatherArray;
            })
            .catch(error => dispatch(fetchWeatherFailure(error)));
    };
}
