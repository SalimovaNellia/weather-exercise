export const SET_ACTIVE_DAY = 'SET_ACTIVE_DAY';

export const setActiveDay = (index) => {
    return {
        type: SET_ACTIVE_DAY,
        payload: index
    };
};
