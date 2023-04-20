import { collection } from "firebase/firestore";
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
const addComment = (data) => {
  return {
    type: placesTypes.ADD_COMMENT,
    payload: data,
  };
};
export const createCommentAsync = (documentId) => {
  return async (dispatch) => {
    try {
      const docRef = collection(collectionName);
      console.log(docRef);
      await docRef.update([...docRef,]);
      dispatch({ type: 'UPDATE_DOCUMENT_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'UPDATE_DOCUMENT_ERROR', error });
    }
  };
};
