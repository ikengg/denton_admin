import { combineReducers } from "redux";

import authReducer from './authReducer'
import categoryReducer from './categoryReducer';
import articleReducer from './articleReducer';
import videoReducer from './videoReducer';
import clinicReducer from './clinicReducer';
import newsReducer from './newsReducer';


const rootReducer = combineReducers({
    authReducer,
    categoryReducer,
    articleReducer,
    videoReducer,
    clinicReducer,
    newsReducer
});
  
export default rootReducer;