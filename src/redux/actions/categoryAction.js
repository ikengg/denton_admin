
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
const storageRef = firebase.storage().ref(`category`);

const setStateLoadCategoryComplete = (category, unsubscribe) => ({
    type: LOAD_CATEGORY,
    payload: {
        category,
        unsubscribe
    }
});

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

// function to view
export const getCategory = (handleEditButton, handleDeleteButton) => {
    return async dispatch => {
        try {
            const unsubscribe = categoryCollection.onSnapshot(snapshot => {
                let newState = [];
                snapshot.docs.forEach((document) => {
                    let { categoryImage, categorImageName, name } = document.data();
                    console.log(name);
                    newState.push({
                        // id: document.id,
                        categoryImage: (
                            <img
                                src={categoryImage}
                                height={50}
                                width={50}
                                alt={name}
                            />
                        ),
                        name: document.data().name,
                        edit: (
                            <Button onClick={(e) => {
                                handleEditButton(document.id, name, categoryImage, categorImageName);
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
                                handleDeleteButton(document.id, name, categorImageName);
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

export const addCategory = (data, setIsFormShow) => {
    return async dispatch => {
        dispatch(setStateAddCategoryLoading());
        setTimeout(async () => {
            try {

                let isExist = await categoryCollection.where("name", "==", data.name).get();
                console.log(isExist.empty);
                if (!isExist.empty) {
                    let error = {
                        message: "หมวดหมู่นี้มีอยู่ในระบบแล้ว"
                    };
                    dispatch(setStateAddCategoryError(error));
                    return;
                }

                // upload image
                console.log(data.image.name)
                console.log(data.image)
                let uploadImage = await storageRef.child(data.image.name).put(data.image);
                let imageUrl = await uploadImage.ref.getDownloadURL();
                console.log(imageUrl);

                // save to firestore db
                await categoryCollection.add({
                    categoryImage: imageUrl,
                    categorImageName: data.image.name,
                    name: data.name,
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


export const editCategory = (id, data, categorImageName, handleCloseEditDialog) => {
    
    return async (dispatch) => {
        try {           

            // ถ้าอัพรูปใหใม่ ลบของเก่าก่อน
            if (data.image) {

                await storageRef.child(categorImageName).delete();
                // upload image
                let uploadImage = await storageRef.child(data.image.name).put(data.image);
                let imageUrl = await uploadImage.ref.getDownloadURL();                

                await categoryCollection.doc(`${id}`).update({
                    name: data.name,
                    categoryImage: imageUrl,
                    categorImageName: data.image.name,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });

            } else {
                await categoryCollection.doc(`${id}`).update({
                    name: data.name,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
            handleCloseEditDialog();
        } catch (e) {            
            dispatch(setStateAddCategoryError(e));
        }
    };
};

export const deleteCategory = (id, categorImageName, handleCloseDeleteDialog) => {
    return async () => {
        try {

            //delete image
            await storageRef.child(categorImageName).delete();

            //delte from db
            await categoryCollection.doc(id).delete();

        } catch (e) {
            console.log(e);
        } finally {
            handleCloseDeleteDialog();
        }
    };
};



