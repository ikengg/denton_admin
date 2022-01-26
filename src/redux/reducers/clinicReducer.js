import {
    LOAD_CLINIC,
    ADD_CLINIC_LOADING,
    ADD_CLINIC_COMPLETE,
    ADD_CLINIC_ERROR
} from '../actions/clinicAction';

const initState = {

    clinic: null,
    unsubscribe: null,

    //adding
    isAddLoading: false,
    isAddError: false,
    addError: null,
};

const clinicReducer = (state = initState, action) => {

    switch (action.type) {
        case LOAD_CLINIC:
            return {
                ...state,
                clinic: [...action.payload.clinic],
                unsubscribe: action.payload.unsubscribe,
            };
        case ADD_CLINIC_LOADING:
            return {
                ...state,
                isAddLoading: true,
                isAddError: false,
            }
        case ADD_CLINIC_COMPLETE:
            return {
                ...state,
                isAddLoading: false,
                isAddError: false,
            }
        case ADD_CLINIC_ERROR:
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

export default clinicReducer;