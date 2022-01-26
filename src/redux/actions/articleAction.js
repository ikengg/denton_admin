import firebase from "../../firebase";

import {
    Button,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

export const LOAD_ARTICLE = 'LOAD_ARTICLE';
export const LOAD_CATEGORY = 'LOAD_CATEGORY';
export const ADD_ARTICLE_LOADING = 'ADD_ARTICLE_LOADING';
export const ADD_ARTICLE_COMPLETE = 'ADD_ARTICLE_COMPLETE';
export const ADD_ARTICLE_ERROR = 'ARTICLE';

const categoryCollection = firebase.firestore().collection('category');
const articleCollection = firebase.firestore().collection('mySpecialCare');

const storageRef = firebase.storage().ref(`images`);

//--------- set state func

const setStateLoadCategoryComplete = (category, unsubscribe) => ({
    type: LOAD_CATEGORY,
    payload: {
        category,
        unsubscribe
    }
});

const setStateLoadArticleComplete = (article, unsubscribe) => ({
    type: LOAD_ARTICLE,
    payload: {
        article,
        unsubscribe
    }
});

const setStateAddArticleLoading = () => ({
    type: ADD_ARTICLE_LOADING,
});

const setStateAddArticleComplete = () => ({
    type: ADD_ARTICLE_COMPLETE,
});

const setStateAddArticleError = (error) => ({
    type: ADD_ARTICLE_ERROR,
    payload: {
        error
    }
});


//--------- func to view 

export const getCategory = () => {
    return async dispatch => {
        try {
            const unsubscribe = categoryCollection.onSnapshot(snapshot => {
                let newState = [];
                snapshot.docs.forEach((document) => {
                    newState.push({
                        id: document.id,
                        name: document.data().name,
                    });
                });

                dispatch(setStateLoadCategoryComplete(newState, unsubscribe));

            });
        } catch (e) {
            console.log(e);
        }
    };
};

export const getAllArticle = (handleEditButton, handleDeleteButton, tag) => {
    return async dispatch => {
        try {
            const unsubscribe = articleCollection.where("tag", "==", tag).onSnapshot(async (snapshot) => {
                let newState = [];

                for (let document of snapshot.docs) {

                    //get category name from category id
                    let { titleImage, imageName, title, category, article } = document.data();
                    let categoryName = await categoryCollection.doc(category).get();

                    newState.push({
                        titleImage: (
                            <img
                                src={titleImage}
                                height={100}
                                width={200}
                                alt={title}
                            />
                        ),
                        title,
                        category: categoryName.data().name,
                        article: (
                            <div
                                dangerouslySetInnerHTML={{ __html: article }}
                            />
                        ),
                        edit: (
                            <Button onClick={() => { handleEditButton(document.id, { titleImage, imageName, title, category, article }, titleImage, imageName) }}>
                                <EditIcon
                                    color="primary"
                                >
                                    แก้ไข
                                </EditIcon>
                            </Button>
                        ),
                        delete: (
                            <Button onClick={() => {
                                handleDeleteButton(document.id, title, imageName)
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

                dispatch(setStateLoadArticleComplete(newState, unsubscribe));

            });

        } catch (e) {
            console.log(e);
        }
    };
};

export const addArticle = (data, setIsFormShow) => {
    return async dispatch => {
        dispatch(setStateAddArticleLoading());
        try {
            console.log(data);

            //upload image
            let uploadImage = await storageRef.child(data.image.name).put(data.image);
            let imageUrl = await uploadImage.ref.getDownloadURL();
            console.log(imageUrl);

            //save to firestore db
            await articleCollection.add({
                titleImage: imageUrl,
                imageName: data.image.name,
                title: data.title,
                category: data.category,
                article: data.article,
                tag: data.tag,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            dispatch(setStateAddArticleComplete());
            setIsFormShow(false);

        } catch (e) {
            dispatch(setStateAddArticleComplete(e));
            console.log(e);
        }
    };
};

export const editArticle = (id, data, imageName, handleCloseEditDialog) => { 
    return async (dispatch) => {
        try {

            // const schema = yup.object().shape({
            //     image: (id === '') ?yup.mixed().required('กรุณาเลือกรูปภาพ') :yup.mixed() ,
            //     title: (id === '') ?yup.string().required('กรุณากรอก title') :yup.string(),
            //     category: (id === '') ?yup.string().required('กรุณาเลือกหมวดหมู่') :yup.string(),
            //     article: (id === '') ?yup.string().required('กรุณาเขียนบทความ') :yup.string(),
            // });

            // ถ้าอัพรูปใหใม่ ลบของเก่าก่อน
            if (data.image) {

                //delete old image
                await storageRef.child(imageName).delete();

                // upload new image
                let uploadImage = await storageRef.child(data.image.name).put(data.image);
                let imageUrl = await uploadImage.ref.getDownloadURL();                

                await articleCollection.doc(`${id}`).update({
                    title: data.title,
                    category: data.category,
                    article: data.article,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    titleImage: imageUrl,
                    imageName: data.image.name,
                });

            } else {
                await articleCollection.doc(`${id}`).update({
                    title: data.title,
                    category: data.category,
                    article: data.article,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
            handleCloseEditDialog();
        } catch (e) {            
            dispatch(setStateAddArticleError(e));
        }
    };
};

export const deleteArticle = (id, imageName, handleCloseDeleteDialog) => {
    return async () => {
        try {

            //delete image
            await storageRef.child(imageName).delete();

            //delte from db
            await articleCollection.doc(id).delete();

        } catch (e) {
            console.log(e);
        } finally {
            handleCloseDeleteDialog();
        }
    };
};


