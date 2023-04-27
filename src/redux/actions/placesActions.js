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
export const createCommentAsync = (id, user, info) => {
  return async (dispatch) => {
    let idPlace;
    let array = [];
    try {
      const q = query(placesCollection, where("id", "==", id));
      const placeDoc = await getDocs(q);
      console.log(placeDoc);
      placeDoc.forEach((place) => {
        console.log(place);
        
        idPlace = place.id;
        array = place.data().comments;
      });

      const newComment = {
        idUser: user.id,
        nameUser : user.name,
        imgUser: user.photo,
        comment: info.comment,
      };
      const docRef = doc(dataBase, collectionName, idPlace);

      const comments = [...array, newComment];
      await updateDoc(docRef, { comments: comments });

      const data = await filterCollections({
        key: "",
        collectionName,
        value: null,
      });
      dispatch(getPlaces(data));
    } catch (error) {
      console.log(error);
      dispatch(addComment(array));
    }
  };
};
export const changeStatusAsync = (id, status) => {
  return async (dispatch) => {
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
      const data = await filterCollections({
        key: "",
        collectionName,
        value: null,
      });
      dispatch(getPlaces(data));
    } catch (error) {
      console.log(error);
    }
  };
};
