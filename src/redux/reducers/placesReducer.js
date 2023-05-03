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
                places: action.payload

            }
        case placesTypes.ADD_COMMENT:
            return {
                ...state,
                places: action.payload

            }
            case placesTypes.CHANGE_STATUS_POST :
                return {
                    ...state,
                    places : action.payload
                    
                }
            case placesTypes.RATE_POST :
                return {
                    ...state,
                    places : action.payload
                    
                }
            
            
    
        default:
            return state;
    }
  
}