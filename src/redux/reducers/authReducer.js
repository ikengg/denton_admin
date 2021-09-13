import { TrendingUpRounded } from '@material-ui/icons';
import {
    LOGIN_SUSCESS,
    LOGIN_FAILED,
    GET_CURRENT_USER,
    LOGOUT
} from '../actions/authAction'

const initState = {
    profile: null,
    loading: true,
    error: null,
    isLogedin: false,
}

const authReducer = (state = initState, action) => {

    switch (action.type) {
        case GET_CURRENT_USER:
            let getUser = action.payload.user;
            console.log('get cruttent')
            console.log(getUser)
            return {
                ...state,
                profile: getUser,
                loading: false,
                isLogedin: (getUser? true: false),
                error: null,
            };
        case LOGIN_SUSCESS:
            
            let userLogin = action.payload.user;
            console.log("LOGIN SUSCESS")
            console.log(userLogin)
            return {
                ...state,
                profile: userLogin,
                loading: false,
                isLogedin: true,
                error: null,
            };
        case LOGIN_FAILED:
            let loginError = action.payload.err.message;
            return {
                ...state,
                loading: false,
                error: loginError,
            };
        case LOGOUT:
            console.log("Logout Success");
            return {
                ...state,
                profile: null,
                loading: false,
                isLogedin: false,
            };
        default:
            return state
    }

}

export default authReducer