import { filterCollections } from "../../services/filterCollections";
import { placesTypes } from "../types/placesTypes";

const collectionName = "places";

const getPlaces = (data) => {
  return {
    type: placesTypes.GET_PLACES,
    payload: data,
  };
};

export const getPlacesAsync = () => {
  return async (dispatch) => {
    try {
      const data = await filterCollections({key : '', collectionName, value : null})
      dispatch(getPlaces(data))
    } catch (error) {
      console.log(error);
      dispatch(getPlaces([]))
    }
  };
};
