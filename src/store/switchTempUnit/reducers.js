import {SWITCH_TEMPERATURE_UNIT} from "./actions";

const initialState = {
    unit: "F"
};

export const switchTempUnitReducer = (state = initialState, action) => {
    switch (action.type) {
        case SWITCH_TEMPERATURE_UNIT: {
            return {...state, unit: action.payload};
        }
    }
    return state;
};
