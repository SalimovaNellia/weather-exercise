import RadioGroup from "@material-ui/core/RadioGroup";
import React from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {switchTemperatureUnit} from "../store/switchTempUnit/actions";
import {store} from "../index";
import {connect} from "react-redux";
import {setActiveDay} from "../store/weatherCarousel/actions";
import {convertTemperatureList} from "../utils/temperatureConverter";

const useStyles = makeStyles(theme => ({
    group: {
        justifyContent: "center",
        padding: "30px"
    },
}));

class SwitchTemperatureUnit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <RadioGroup onChange={(event => {
                this.props.dispatch(switchTemperatureUnit(event.target.value));
            })}
                        aria-label="Switch temp unit"
                        name="switchTempUnit"
                        defaultValue="F"
                        row
                        style={radioStyle}
            >
                <FormControlLabel value="C"
                                  control={<Radio color="primary"/>}
                                  label="Celsius"
                />
                <FormControlLabel value="F"
                                  control={<Radio color="primary"/>}
                                  label="Fahrenheit"
                />
            </RadioGroup>
        )
    }
}

const radioStyle = {
    justifyContent: 'center',
    padding: '50px'
}

const mapStateToProps = (state) => {
    return {
        selectedDayWeatherIndex: state.weatherCarousel.selectedDateIndex
    }
};

export default connect(mapStateToProps)(SwitchTemperatureUnit);


