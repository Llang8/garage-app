import * as firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB4y8Ga0uHHIxpHVFXH6kifKEU6bNMjnYY",
    authDomain: "garage-app-78457.firebaseapp.com",
    databaseURL: "https://garage-app-78457.firebaseio.com",
    projectId: "garage-app-78457",
    storageBucket: "garage-app-78457.appspot.com",
    messagingSenderId: "620969335942",
    appId: "1:620969335942:web:43ca9780c8bb56f2a1c507",
    measurementId: "G-4EQCX7B1V8"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const GeoPoint = firebase.firestore.GeoPoint;
export default firebase;