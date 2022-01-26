import {
    LOAD_ARTICLE,
    ADD_ARTICLE_LOADING,
    ADD_ARTICLE_COMPLETE
} from '../actions/articleAction';

const initState = {
    article: null,
    unsubscribeArticle: null,
    unsubscribe: null, // use for subscripe firestore realtime and release 
    //adding
    isAddLoading: false,
    isAddError: false,
};

const articleReducer = (state = initState, action) => {

    switch (action.type) {
        case LOAD_ARTICLE:
            return {
                ...state,
                article: [...action.payload.article],
                unsubscribeArticle: action.payload.unsubscribe,
            };
        case ADD_ARTICLE_LOADING:
            return {
                ...state,
                isAddLoading: true,
                isAddError: false,
            }
        case ADD_ARTICLE_COMPLETE:
            return {
                ...state,
                isAddLoading: false,
                isAddError: false,
            }
        default:
            return state
    }

}

export default articleReducer;