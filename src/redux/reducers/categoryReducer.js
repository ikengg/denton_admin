
import {
    LOAD_CATEGORY,
    ADD_CAT_LOADING,
    ADD_CAT_COMPLETE,
    ADD_CAT_ERROR,
} from '../actions/categoryAction';

const initState = {
    category: null,
    unsubscribe: null,
    loading: true,
    errorLoading: null,
    isAddLoading: false,
    isAddError: false,
    addError: null
};

const categoryReducer = (state = initState, action) => {

    switch (action.type) {
        case LOAD_CATEGORY:
            return {
                ...state,
                category: [...action.payload.category],
                unsubscribe: action.payload.unsubscribe,
                loading: false,
                errorLoading: null,
            };
        case ADD_CAT_LOADING:
            return {
                ...state,
                isAddLoading: true,
                isAddError: false,
            };
        case ADD_CAT_COMPLETE:
            return {
                ...state,
                isAddLoading: false,
                isAddError: false,
            };
        case ADD_CAT_ERROR:
            return {
                ...state,
                isAddLoading: false,
                isAddError: true,
                addError: action.payload.error
            };
        default:
            return state
    }

}

export default categoryReducer;