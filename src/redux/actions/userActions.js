import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, dataBase } from "../../firebase/firebaseConfig";
import { getUsers } from "../../services/getUsers";
import { collection } from "firebase/firestore";
import { userTypes } from "../types/userTypes";

const collectionName = "users";
const usersCollection = collection(dataBase, collectionName);

export const loginUser = (user, error) => {
  return {
    type: userTypes.LOGIN_USER,
    payload: { user, error },
  };
};
export const loginUserAsync = (email, password) => {
  return async (dispatch) => {
    try {
      const login = await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginUser());
    } catch (error) {
      console.log(error);
    }
  };
};

export const verifyCodeAsync = (code) => {
  return (dispatch) => {
    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        const user = result.user.auth.currentUser;
        const userCollection = await getUsers(user.uid);
        console.log(userCollection);
        dispatch(
          loginUser({ ...userCollection }, { status: false, message: "" })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginUser({}, { status: true, message: error.message }));
      });
  };
};
