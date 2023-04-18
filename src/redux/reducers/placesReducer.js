import { placesTypes } from "../types/placesTypes";

const initialValue = {
    places : [],
    error : {
        status : null,
        message : ''
    }
}

export const placesRedcuer = (state = initialValue, action) => {
    switch (action.type) {
        case placesTypes.GET_PLACES:
            return {
                ...state,
                places: [...state.places, action.payload]

            }
            
    
        default:
            return state;
    }
  
}