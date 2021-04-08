import { SET_LOGIN, SET_LOGOUT } from "../actions/loginAction";

const initState = {
    isLogin: false,
};

const loginReducer = (state = initState, action) => {
    switch (action.type) {
      case SET_LOGIN:
        return {
          ...state,
          profile: action.payload.isLogin,
        };
      case SET_LOGOUT:
        return {
          ...state,
          profile: action.payload.isLogin,
        };
      default:
        return state;
    }
  };

