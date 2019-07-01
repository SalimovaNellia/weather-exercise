import React from "react";
import WeatherCarousel from "./WeatherCarousel";
import {connect} from "react-redux";
import DetailedWeather from "./DetailedWeather";
import {fetchWeatherData} from "../store/weather/actions";
import SwitchTemperatureUnit from "./SwitchTemperatureUnit";
import {convertTemperatureList} from "../utils/temperatureConverter";
import CircularProgress from "@material-ui/core/CircularProgress";

class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchWeatherData(this.props.city, this.props.countryCode));
    }


    render() {
        const {error, loading} = this.props;

        if (error) {
            return <div>Error! {error.message}</div>;
        }

        if (loading) {
            return <div style={loadingWrapStyle}>
                <CircularProgress color="primary"/>
            </div>;
        }

        return (
            <div>
                <SwitchTemperatureUnit/>
                <WeatherCarousel day={this.props.weatherList[this.props.selectedDayWeatherIndex]}/>
                <DetailedWeather day={this.props.weatherList[this.props.selectedDayWeatherIndex]}/>
            </div>
        )
    }
}


const loadingWrapStyle = {
    display: 'flex',
    alignItems: 'center',
    alignContent:'center',
    justifyContent: 'center',
    height: '100vh'
}

const mapStateToProps = (state) => {
    const weatherList = convertTemperatureList(state.weather.items, state.switchTempUnit.unit);

    return {
        city: state.root.city,
        countryCode: state.root.countryCode,
        temperatureUnit: state.switchTempUnit.unit,
        loading: state.weather.loading,
        weatherList: weatherList,
        selectedDayWeatherIndex: state.weatherCarousel.selectedDateIndex
    }
};

export default connect(mapStateToProps)(App)
