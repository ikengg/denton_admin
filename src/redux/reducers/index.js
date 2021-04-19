import { combineReducers } from "redux";

import formStepperReducer from './formStepperReducer';
import authReducer from './authReducer'

const rootReducer = combineReducers({
    formStepperReducer,
    authReducer
});
  
export default rootReducer;