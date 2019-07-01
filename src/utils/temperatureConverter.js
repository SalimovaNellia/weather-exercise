export function convertToF(celsius) {
    return (celsius * 9/5 + 32).toFixed(2);
}

export function convertToC(fahrenheit) {
    return ((fahrenheit - 32) * 5 / 9).toFixed(2);
}

export function convertTemperatureList(days, unit) {
    days.forEach(day => {
        day.weatherArray.forEach(weatherData => {
            if (weatherData.weather.temperature.unit !== unit){
                if (unit === "F"){
                    weatherData.weather.temperature.unit = "F";
                    weatherData.weather.temperature.value = convertToF(weatherData.weather.temperature.value);
                } else if (unit === "C"){
                    weatherData.weather.temperature.unit = "C";
                    weatherData.weather.temperature.value = convertToC(weatherData.weather.temperature.value);
                }
            }
        })
    });
    return days;
}
