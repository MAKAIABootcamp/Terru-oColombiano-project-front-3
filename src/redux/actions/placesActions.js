import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { filterCollections } from "../../services/filterCollections";
import { placesTypes } from "../types/placesTypes";
import { dataBase } from "../../firebase/firebaseConfig";

const collectionName = "places";
const placesCollection = collection(dataBase, collectionName);

const getPlaces = (data) => {
  return {
    type: placesTypes.GET_PLACES,
    payload: data,
  };
};

export const getPlacesAsync = () => {
  return async (dispatch) => {
    try {
      const data = await filterCollections({
        key: "",
        collectionName,
        value: null,
      });
      dispatch(getPlaces(data));
    } catch (error) {
      console.log(error);
      dispatch(getPlaces([]));
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
      await docRef.update([...docRef]);
      dispatch({ type: "UPDATE_DOCUMENT_SUCCESS" });
    } catch (error) {
      dispatch({ type: "UPDATE_DOCUMENT_ERROR", error });
    }
  };
};
export const changeStatusAsync = (id, status) => {
  return async () => {
    let idPlace;
    try {
      const q = query(placesCollection, where("id", "==", id));
      const placeDoc = await getDocs(q);
      placeDoc.forEach((place) => {
        idPlace = place.id;
      });
      const docRef = doc(dataBase, collectionName, idPlace);
      if (status === "accepted") {
        await updateDoc(docRef, { status: "Aceptado" });
      } else {
        await updateDoc(docRef, { status: "Rechazada" });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
