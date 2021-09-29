
import firebase from "../../firebase";
import {
    Button,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

export const LOAD_CATEGORY = 'LOAD_CATEGORY';
export const ADD_CAT_LOADING = 'ADD_CAT_LOADING';
export const ADD_CAT_COMPLETE = 'ADD_CAT_COMPLETE';
export const ADD_CAT_ERROR = 'ADD_CAT_ERROR';

const categoryCollection = firebase.firestore().collection('category');

const setStateLoadCategoryComplete = (category, unsubscribe) => ({
    type: LOAD_CATEGORY,
    payload: {
        category,
        unsubscribe
    }
});

export const getCategory = (handleEditButton, handleDeleteButton) => {
    return async dispatch => {
        try {
            const unsubscribe = categoryCollection.onSnapshot(snapshot => {
                let newState = [];
                snapshot.docs.forEach((document) => {
                    newState.push({
                        // id: document.id,
                        name: document.data().name,
                        edit: (
                            <Button onClick={(e) => {
                                handleEditButton(document.id, document.data().name, categoryCollection);
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
                                handleDeleteButton(document.id, document.data().name, categoryCollection);
                            }}>
                                <DeleteForeverIcon
                                    color="secondary"
                                >
                                    ลบ
                                </DeleteForeverIcon>
                            </Button>
                        )

                    });
                });

                // setDatatable({ ...datatable, rows: newState });
                // console.log(newState);
                dispatch(setStateLoadCategoryComplete(newState, unsubscribe));

            })
        } catch (e) {
            console.log(e);
        }
    };
};


const setStateAddCategoryLoading = () => ({
    type: ADD_CAT_LOADING,
});

export const setStateAddCategoryComplete = () => ({
    type: ADD_CAT_COMPLETE,
});

const setStateAddCategoryError = (error) => ({
    type: ADD_CAT_ERROR,
    payload: {
        error
    }
});


export const addCategory = (name, setIsFormShow) => {
    return async dispatch => {
        dispatch(setStateAddCategoryLoading());
        setTimeout(async () => {
            try {

                let isExist = await categoryCollection.where("name", "==", name).get();
                console.log(isExist.empty);
                if (!isExist.empty) {
                    let error = {
                        message: "หมวดหมู่นี้มีอยู่ในระบบแล้ว"
                    };
                    dispatch(setStateAddCategoryError(error));
                    return;
                }
                
                // console.log("after return!");
                await categoryCollection.add({
                    name: name,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                dispatch(setStateAddCategoryComplete());
                setIsFormShow(false);

            } catch (e) {
                dispatch(setStateAddCategoryError(e));
                console.log(e);
            }
        }, 1500);

    };
};

export const editCategory = (id, name, handleCloseEditDialog) => {
    console.log(name);
    return async (dispatch) => {
        try {
           
            let isExist = await categoryCollection.where("name", "==", name).get();
                console.log(isExist.empty);
                if (!isExist.empty) {
                    let error = {
                        message: "หมวดหมู่นี้มีอยู่ในระบบแล้ว"
                    };
                    dispatch(setStateAddCategoryError(error));
                    return;
                }
            // update ค่าไปยัง cloud firestore 
            // const options = { merge: true }
            await categoryCollection.doc(`${id}`).update({
                name: name,
            });
            handleCloseEditDialog();
        } catch (e) {
            console.log(e);
            dispatch(setStateAddCategoryError(e));
        }
    };
};

export const deleteCategory = (id, handleCloseDeleteDialog) => {
    return async () => {
        try {
            const documentRef = categoryCollection.doc(id);
            await documentRef.delete();
        } catch (e) {
            console.log(e);
        } finally {
            handleCloseDeleteDialog();
        }
    };
};



