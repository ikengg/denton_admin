import firebase from "../../firebase";

import {
    Button,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

export const LOAD_CLINIC = 'LOAD_CLINIC';
export const ADD_CLINIC_LOADING = 'ADD_CLINIC_LOADING';
export const ADD_CLINIC_COMPLETE = 'ADD_CLINIC_COMPLETE';
export const ADD_CLINIC_ERROR = 'CLINIC';

const clinicCollection = firebase.firestore().collection('clinic');
const storageRef = firebase.storage().ref(`clinic`);

//--------- set state func

const setStateAddClinicLoading = () => ({
    type: ADD_CLINIC_LOADING,
});

const setStateAddClinicComplete = () => ({
    type: ADD_CLINIC_COMPLETE,
});

const setStateAddClinicError = (error) => ({
    type: ADD_CLINIC_ERROR,
    payload: {
        error
    }
});

const setStateLoadClinicComplete = (clinic, unsubscribe) => ({
    type: LOAD_CLINIC,
    payload: {
        clinic,
        unsubscribe
    }
});

//--------- func to view 

export const addClinic = (data, setIsFormShow) => {
    return async dispatch => {
        dispatch(setStateAddClinicLoading());
        try {

            //upload image
            let uploadImage = await storageRef.child(data.image.name).put(data.image);
            let imageUrl = await uploadImage.ref.getDownloadURL();

            //save to firestore
            await clinicCollection.add({
                image: imageUrl,
                imageName: data.image.name,
                clinicName: data.clinicName,
                telephone: data.telephone,
                address: data.address,
                location: new firebase.firestore.GeoPoint(data.lat, data.lon),
                article: data.article,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            dispatch(setStateAddClinicComplete());
            setIsFormShow(false);

        } catch (e) {
            dispatch(setStateAddClinicComplete(e));
            console.log(e);
        }
    };
};

export const getAllClinic = (handleEditButton, handleDeleteButton) => {
    return async dispatch => {
        try {
            const unsubscribe = clinicCollection.onSnapshot(async (snapshot) => {
                let newState = [];

                for (let document of snapshot.docs) {

                    //get category name from category id
                    let {
                        image,
                        imageName,
                        clinicName,
                        telephone,
                        location,
                        address,
                        article
                    } = document.data();

                    let lat = location.latitude;
                    let lon = location.longitude;
                    newState.push({
                        image: (
                            <img
                                src={image}
                                height={100}
                                width={200}
                                alt={clinicName}
                            />
                        ),
                        clinicName,
                        telephone,
                        lat,
                        lon,
                        address,
                        article: (
                            <div
                                dangerouslySetInnerHTML={{ __html: article }}
                            />
                        ),
                        edit: (
                            <Button onClick={() => { handleEditButton(document.id, { 
                                image, 
                                imageName, 
                                clinicName, 
                                telephone, 
                                address, 
                                lat,
                                lon,
                                // location.latitude, 
                                // location.longitude, 
                                article }, image, imageName) }}
                            >
                                <EditIcon
                                    color="primary"
                                >
                                    แก้ไข
                                </EditIcon>
                            </Button>
                        ),
                        delete: (
                            <Button onClick={() => {
                                handleDeleteButton(document.id, clinicName, imageName)
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

                dispatch(setStateLoadClinicComplete(newState, unsubscribe));

            });

        } catch (e) {
            console.log(e);
        }
    };
};

export const editClinic = (id, data, imageName, handleCloseEditDialog) => { 
    return async (dispatch) => {
        try {

            // ถ้าอัพรูปใหใม่ ลบของเก่าก่อน
            if (data.image) {
                //delete old image
                await storageRef.child(imageName).delete();

                // upload new image
                let uploadImage = await storageRef.child(data.image.name).put(data.image);
                let imageUrl = await uploadImage.ref.getDownloadURL();                

                await clinicCollection.doc(`${id}`).update({
                    clinicName: data.clinicName,
                    telephone: data.telephone,
                    article: data.article,
                    address: data.address,
                    location: new firebase.firestore.GeoPoint(data.lat, data.lon),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    image: imageUrl,
                    imageName: data.image.name,
                });

            } else {
                await clinicCollection.doc(`${id}`).update({
                    clinicName: data.clinicName,
                    telephone: data.telephone,
                    article: data.article,
                    address: data.address,
                    location: new firebase.firestore.GeoPoint(data.lat, data.lon),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                });
            }
            handleCloseEditDialog();
        } catch (e) {            
            dispatch(setStateAddClinicError(e));
        }
    };
};

export const deleteClinic = (id, imageName, handleCloseDeleteDialog) => {
    return async () => {
        try {

            //delete image
            await storageRef.child(imageName).delete();

            //delte from db
            await clinicCollection.doc(id).delete();

        } catch (e) {
            console.log(e);
        } finally {
            handleCloseDeleteDialog();
        }
    };
};