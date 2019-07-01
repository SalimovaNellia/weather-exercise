import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import CardHeader from '@material-ui/core/CardHeader';
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {setActiveDay} from "../store/weatherCarousel/actions";
import {convertTemperatureList} from "../utils/temperatureConverter";


class WeatherCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemIndex: 0,
            numberOfCards: document.documentElement.clientWidth > 700 ? 3 : 2
        };
    }

    changeActiveItem = (activeItemIndex) => this.setState({...this.state, activeItemIndex});

    render() {
        let map = convertTemperatureList(this.props.weatherList).map((value, index) =>
            <Card color="primary" key={value.date} onClick={() => this.props.dispatch(setActiveDay(index))} style={cardStyle}>
                <CardHeader title={value.date} titleTypographyProps={{align: 'center'}} style={titleStyle}/>
                <CardContent>
                    <Typography component="p" variant="subtitle1" color="textPrimary">
                        Temperature: {value.weatherArray[0].weather.temperature.value}
                    </Typography>
                    <Typography component="p" variant="subtitle1" color="textPrimary">
                        Humidity: {value.weatherArray[0].weather.humidity}
                    </Typography>
                    <Typography component="p" variant="subtitle1" color="textPrimary">
                        Pressure: {value.weatherArray[0].weather.pressure}
                    </Typography>
                    <Typography component="p" variant="subtitle1" color="textPrimary">
                        Description: {value.weatherArray[0].weather.description}
                    </Typography>
                </CardContent>
            </Card>
        );

        return (
            <ItemsCarousel
                style={carouselWrapStyle}
                numberOfCards={this.state.numberOfCards}
                gutter={12}
                showSlither={true}
                firstAndLastGutter={true}
                freeScrolling={false}

                requestToChangeActive={this.changeActiveItem}
                activeItemIndex={this.state.activeItemIndex}
                activePosition={'center'}

                rightChevron={<i className="material-icons" style={arrowStyle}>chevron_right</i>}
                leftChevron={<i className="material-icons" style={arrowStyle}>chevron_left</i>}
                outsideChevron={false}
            >
                {map}
            </ItemsCarousel>

        );
    }
}

const carouselWrapStyle = {
    marginBottom: '50px'
};

const arrowStyle = {
    color: 'black',
    fontSize: '48px'
};


const  titleStyle = {
        backgroundColor: '#e8eaf6'
};

const cardStyle = {
    borderBottom: '1px solid #e8eaf6'
};

function mapStateToProps(state) {
    return {
        weatherList: state.weather.items
    }
}

export default connect(mapStateToProps)(WeatherCarousel)
