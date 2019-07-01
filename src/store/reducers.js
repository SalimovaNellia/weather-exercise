import {combineReducers} from "redux";
import {switchTempUnitReducer} from "./switchTempUnit/reducers";
import {weatherCarouselReducer} from "./weatherCarousel/reducers";
import weatherReducer from "./weather/reducers";

const initialState = {
    city: "Munich",
    countryCode: "DE"
};

const rootReducer = (state = initialState, action) => {
    return state;
};

export default combineReducers({
    root: rootReducer,
    weather: weatherReducer,
    switchTempUnit: switchTempUnitReducer,
    weatherCarousel: weatherCarouselReducer
});
