export const SELECT_CITY = "SELECT_CITY";
export const REMOVE_CITY = "REMOVE_CITY";
export const CHANGE_DEG = "CHANGE_DEG";
export const UPDATE_CITY = "UPDATE_CITY";


export function selectCity(city) {
    return {
        type: SELECT_CITY,
        city
    };
}

export function removeCity(i) {
    return {
        type: REMOVE_CITY,
        index: i
    };
}

export function updateCity(city, i){
    return {
        type: UPDATE_CITY,
        index: i,
        city
    }
}

export function changeDeg(deg){
    return {
        type: CHANGE_DEG,
        deg
    }
}


