import {FETCH_WEATHER_BEGIN, FETCH_WEATHER_FAILURE, FETCH_WEATHER_SUCCESS} from "./actions";

const initialState = {
    items: [],
    loading: true,
    error: null
};

export default function weatherReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_WEATHER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_WEATHER_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.weatherList
            };

        case FETCH_WEATHER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };
        default:
            return state;
    }
}
