import {SET_ACTIVE_DAY} from "./actions";

const initialState = {
    selectedDateIndex: 0,
};

export const weatherCarouselReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_DAY: {
            return {...state, selectedDateIndex: action.payload};
        }
    }
    return state;
};
