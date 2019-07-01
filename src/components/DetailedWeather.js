import React, {PureComponent} from 'react';
import {BarChart, Bar, XAxis} from 'recharts';
import {connect} from "react-redux";
import YAxis from "recharts/es6/cartesian/YAxis";

class DetailedWeather extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const chartWidth = document.documentElement.clientWidth > 700 ? 650 : 300;
        return (
            <div style={chartWrapStyle}>
                <BarChart
                    width={chartWidth}
                    height={300}
                    data={this.props.day.weatherArray}
                >
                    <XAxis dataKey="time"/>
                    <YAxis />
                    <Bar dataKey="weather.temperature.value" fill="#3f51b5"/>
                </BarChart>
            </div>
        );
    }
}

const chartWrapStyle = {
    display: 'flex',
    justifyContent: 'center'
}

function mapStateToProps(state) {
    return {
        weatherList: state.weather.items,
        selectedDayWeatherIndex: state.weatherCarousel.selectedDateIndex
    }
}
export default connect()(DetailedWeather)
