import firebase from "../../firebase";
import {
    Button,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import ReactPlayer from 'react-player/youtube'


export const LOAD_VIDEO = 'LOAD_VIDEO';
export const ADD_VIDEO_LOADING = 'ADD_VIDEO_LOADING';
export const ADD_VIDEO_COMPLETE = 'ADD_VIDEO_COMPLETE';
export const ADD_VIDEO_ERROR = 'ADD_VIDEO_ERROR';

const videoCollection = firebase.firestore().collection('video');
const categoryCollection = firebase.firestore().collection('category');


const setStateLoadVideoComplete = (video, unsubscribe) => ({
    type: LOAD_VIDEO,
    payload: {
        video,
        unsubscribe
    }
});

export const getAllVideo = (handleEditButton, handleDeleteButton) => {
    return async dispatch => {
        try {
            const unsubscribe = videoCollection.onSnapshot(async (snapshot) => {
                let newState = [];

                for (let document of snapshot.docs) {

                    //get category name from category id
                    let { title, videoUrl, category } = document.data();
                    let categoryName = await categoryCollection.doc(category).get();
                    console.log(categoryName);
                    newState.push({
                        title: title,
                        // video: videoUrl,
                        video: (
                            <ReactPlayer
                                url={videoUrl}
                            />
                        ),
                        category: categoryName.data().name,
                        edit: (
                            <Button onClick={(e) => {
                                handleEditButton(document.id, title);
                            }}>
                                <EditIcon
                                    color="primary"
                                >
                                    แก้ไข
                                </EditIcon>
                            </Button>
                        ),
                        delete: (
                            <Button onClick={(e) => {
                                handleDeleteButton(document.id, title);
                            }}>
                                <DeleteForeverIcon
                                    color="secondary"
                                >
                                    ลบ
                                </DeleteForeverIcon>
                            </Button>
                        )

                    });

                }

                dispatch(setStateLoadVideoComplete(newState, unsubscribe));

            })
        } catch (e) {
            console.log(e);
        }
    };
};

//add video 
const setStateAddVideoLoading = () => ({
    type: ADD_VIDEO_LOADING,
});

export const setStateAddVideoComplete = () => ({
    type: ADD_VIDEO_COMPLETE,
});

const setStateAddVideoError = (error) => ({
    type: ADD_VIDEO_ERROR,
    payload: {
        error
    }
});

export const addVideo = (data, setIsFormShow) => {
    return async dispatch => {
        dispatch(setStateAddVideoLoading());
        setTimeout(async () => {
            try {

                let { title, category, videoUrl } = data;

                //check if title exist
                let isExist = await videoCollection.where("title", "==", title).get();
                if (!isExist.empty) {
                    let error = {
                        message: "หัวข้อนี้มีอยู่ในระบบแล้ว"
                    };
                    dispatch(setStateAddVideoError(error));
                    return;
                }

                // add to db
                await videoCollection.add({
                    title,
                    category,
                    videoUrl,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                dispatch(setStateAddVideoComplete());
                setIsFormShow(false);

            } catch (e) {
                dispatch(setStateAddVideoError(e));
                console.log(e);
            }
        }, 1500);
    };
};

//delete

export const deleteVideo = (id, handleCloseDeleteDialog) => {
    return async () => {
        try {

            //delte from db
            await videoCollection.doc(id).delete();

        } catch (e) {
            console.log(e);
        } finally {
            handleCloseDeleteDialog();
        }
    };
};