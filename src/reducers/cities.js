import {
    SELECT_CITY,
    REMOVE_CITY,
    UPDATE_CITY,
    CHANGE_DEG
} from "../actions/cities";

const initialState = {
    deg: 'C',
    cities: []
}

export function cities(state = initialState, action) {
    switch (action.type) {
        case SELECT_CITY:
            const city = addFahrenheit(action.city);
            return  {
                ...state,
                cities: [...state.cities, city]
            };
        case REMOVE_CITY:
            return {
                ...state,
                cities: [
                    ...state.cities.slice(0, action.index),
                    ...state.cities.slice(action.index + 1)
                ]
            };
        case UPDATE_CITY:
            return {
              ...state,
              cities: state.cities.map((city, i) =>{
                  return i === action.index ? addFahrenheit(action.city) : city
              })
            };
        case CHANGE_DEG:
            return {
                ...state,
                deg: action.deg
            }
        default:
            return state;
    }
}

function addFahrenheit(city){
    let copy = Object.assign({}, city);
    copy.main['fahrenheit'] = Math.round( city.main.temp * 1.8 + 32);
    return copy;
}