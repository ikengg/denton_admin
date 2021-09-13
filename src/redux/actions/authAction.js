
import firebase from "../../firebase";
import 'firebase/auth';

export const LOGIN_SUSCESS = 'LOGIN_SUSCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const GET_CURRENT_USER = 'GET_CURRENT_USER'
export const LOGOUT = 'LOGOUT';

let auth = firebase.auth();

export const setStateGetCurrentUser = (user) => ({
    type: GET_CURRENT_USER,
    payload: {
        user
    }
});

export const setStateRecordToLoginSuscess = (user) => ({
    type: LOGIN_SUSCESS,
    payload: {
        user
    }
});

export const setStateRecordToLoginFailed = (err) => ({
    type: LOGIN_FAILED,
    payload: {
        err
    }
});

export const setStateToLogOut = () => ({
    type: LOGOUT,
});


export const getCurrentUser = () => {
    return async dispatch => {
        try {
            firebase.auth().onAuthStateChanged((user) => {
                console.log(user);
                dispatch(setStateGetCurrentUser(user));
            });
        } catch (e) {
            console.log(e);
        }
    };
};

export const signIn = (email, password, history) => {
    return async dispatch => {
        try {
            let user = await auth.signInWithEmailAndPassword(email, password);
            dispatch(setStateRecordToLoginSuscess(user.user));
            history.replace('/');
        } catch (e) {
            dispatch(setStateRecordToLoginFailed(e));
        }
    };
};

export const signOut = (dispatch) => {
    return async dispatch => {
        try {
            await auth.signOut();
            dispatch(setStateToLogOut());
        } catch (e) {
            console.log(e)
        }
    }
};