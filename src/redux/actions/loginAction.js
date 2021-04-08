export const SET_LOGIN = "SET_LOGIN";
export const SET_LOGOUT = "SET_LOGOUT";

export const setLogin = () => {
    return {
      type: SET_LOGIN,
      payload: {
        isLogin: true,
      },
    };
};

export const setLogout = () => {
    return {
      type: SET_LOGOUT,
      payload: {
        isLogin: false,
      },
    };
};