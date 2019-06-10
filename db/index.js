var firebase = require('firebase');

const firebaseConfig = {
  apiKey: "AIzaSyBWwH4qOAACOMGiaLh7fK_ufiBbd3dNheI",
  authDomain: "iot-95d.firebaseapp.com",
  databaseURL: "https://iot-95d.firebaseio.com",
  projectId: "iot-95d",
  storageBucket: "iot-95d.appspot.com",
  messagingSenderId: "394113193683",
  appId: "1:394113193683:web:fa9c5fb75839273b"
};

module.exports = firebase.initializeApp(firebaseConfig).firestore();