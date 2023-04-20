import { userTypes } from "../types/userTypes";

const initialState = {
  user: {
    name: "",
    email: "",
    photo: "",
    birthday: "",
    phone: "",
    location: "",
    type: "",
    uid: "",
    description: "",
    posts : [],
    favorites : []
  },
  error: {
    status: undefined,
    message: "",
  },
  isLogged: false,
  loading: false,
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.LOGIN_USER:
      return {
        ...state,
        user: action.payload.user,
        error: action.payload.error,
        isLogged: true,
      };

    case userTypes.EDIT_USER:
      return {
        ...state,
        user: {
          ...state.user,
        },
      };

      case userTypes.ADD_POST:
        return {
          ...state,
          user : {
            ...state.user,
            posts : action.payload
          }
        }
      case userTypes.ADD_FAVORITE:
        return {
          ...state,
          user : {
            ...state.user,
            favorites : action.payload
          }
        }
      case userTypes.DELETE_FAVORITE:
        const favs = state.favorites.filter(item => item.id !== action.payload.id)
        return {
          ...state,
          user : {
            ...state.user,
            favorites : favs
          }
        }

    case userTypes.LOGOUT:
      return state;

    default:
      return state;
  }
};
