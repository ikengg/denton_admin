import {
    LOAD_VIDEO,
    ADD_VIDEO_LOADING,
    ADD_VIDEO_COMPLETE,
    ADD_VIDEO_ERROR,
} from '../actions/videoAction';

const initState = {
    videosList: null,
    unsubscribe: null,

    loading: false,
    errorLoading: null,

    isAddLoading: false,
    isAddError: false,
    addError: null
};

const videoReducer = (state = initState, action) => {

    switch (action.type) {
        case LOAD_VIDEO:
            console.log("HERE")
            console.log(action.payload.video);
            return {
                ...state,
                videosList: [...action.payload.video],
                unsubscribe: action.payload.unsubscribe,
                loading: false,
                errorLoading: null,
            };
        case ADD_VIDEO_LOADING:
            return {
                ...state,
                isAddLoading: true,
                isAddError: false,
            };
        case ADD_VIDEO_COMPLETE:
            return {
                ...state,
                isAddLoading: false,
                isAddError: false,
            };
        case ADD_VIDEO_ERROR:
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

export default videoReducer;