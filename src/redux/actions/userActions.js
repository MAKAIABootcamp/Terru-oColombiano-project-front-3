import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { auth, dataBase } from "../../firebase/firebaseConfig";
import { getUsers } from "../../services/getUsers";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { userTypes } from "../types/userTypes";

const collectionName = "users";
const usersCollection = collection(dataBase, collectionName);

const placesCollectionName = "places"
const  placesCollection = collection(dataBase, placesCollectionName)

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
const createPost = (data) => {
  return {
    type: userTypes.ADD_POST,
    payload: data,
  };
};
export const createPostAsync = (post) => {
  return async (dispatch) => {
    const currentUser = auth.currentUser;
    let id;
    let array = [];

    try {
      const q = query(usersCollection, where("uid", "==", currentUser.uid));
      const userDoc = await getDocs(q);
      userDoc.forEach((user) => {
        id = user.id;
        array = user.data().posts;
      });

    let posts = [...array, post]
      const userRef = doc(dataBase, collectionName, id);
      await updateDoc(userRef, { posts: posts });
      const placesDoc = await addDoc(placesCollection, post);
      dispatch(createPost(posts));
    } catch (error) {
      console.log(error);
      dispatch(createPost(array));
    }
  };
};

export const updateProfileAsync = (user) => {
  return async (dispatch) => {
    try {
      console.log(user);
      const userAuth = auth.currentUser;
      await updateProfile(userAuth, {
        displayName: user.name,
        photoURL: user.photo,
        phoneNumber: user.phone,
        birthday: user.birthday,
      });
      await updatePassword(userAuth, user.password);
      await updateEmail(userAuth, user.email);

      const newUser = {
        uid: userAuth.uid,
        name: user.name,
        email: user.email,
        photo: user.photo,
        location: user.location,
        birthday: user.birthday,
        description : user.description,
        type: "user",
        posts: [],
        favorites: [],
      };
      console.log(newUser);
      const userDocs = await addDoc(usersCollection, newUser);
      dispatch(
        loginUser(
          { ...newUser, id: userDocs.id },
          {
            status: false,
            message: "",
          }
        )
      );
    } catch (error) {
      console.log(error);
      dispatch(loginUser({}, { status: true, message: error.message }));
    }
  };
};
export const createUserAsync = (user) => {
  return async (dispatch) => {

    try {
      const verificate = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      console.log(verificate);
      const newUser = {
        name: user.name,
        email: user.email,
        photo: user.photo,
        location: user.location,
        birthday: user.birthday,
        password : user.password,
        description : user.description,
        phone : user.phone,
        type: "user",
        posts: [],
        favorites: [],
      };
      const userDoc = await addDoc(usersCollection, newUser);

      dispatch(loginUser({ ...newUser }, { status: false, message: "" }));
    } catch (error) {
      console.log(error);
      dispatch(loginUser({}, { status: true, message: error.message }));
    }
  };
};
const logOut = () => {
  return {
    type: userTypes.LOGOUT,
  };
};
export const logOutAsync = () => {
  return async (dispatch) => {
    try {
      signOut(auth);
      dispatch(logOut());
    } catch (error) {
      console.log(error);
    }
  };
};
export const loginWithEmail = (user) => {
  console.log(user);

  return async (dispatch) => {

    try {
      const email = user.email;
      const password = user.password;
      const userAuth = await signInWithEmailAndPassword(auth, email, password);
      const userCollection = await getUsers(userAuth.user.uid);
      dispatch(
        loginUser(
          {
            ...userCollection,
          },
          { status: false, message: "" }
        )
      );
    } catch (error) {
      console.log(error);
      dispatch(loginUser({}, { status: true, message: error.message }));
    }
  };
};
