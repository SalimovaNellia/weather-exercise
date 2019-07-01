export const SWITCH_TEMPERATURE_UNIT = 'SWITCH_TEMPERATURE_UNIT';

export const switchTemperatureUnit = (unit) => {
    return {
        type: SWITCH_TEMPERATURE_UNIT,
        payload: unit
    };
};
