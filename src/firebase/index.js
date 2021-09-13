// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import config from './config';

if (!firebase.apps.length) {
    firebase.initializeApp(config);
};
// firebase.initializeApp(config);

export default firebase;