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

    case userTypes.LOGOUT:
      return state;

    default:
      return state;
  }
};
