import { combineReducers } from "redux";

import formStepperReducer from './formStepperReducer';
import authReducer from './authReducer'
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
    formStepperReducer,
    authReducer,
    categoryReducer,
});
  
export default rootReducer;