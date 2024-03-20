import { initializeApp } from 'firebase/app'

// const serviceAccount = "../ltnc-232-bd977-73182fa4b811.json"

const firebaseConfig = {
    apiKey: "AIzaSyDUoaoiF1Lj6gqkZi2nUSvC16IkgjoCojs",
    authDomain: "ltnc-232-bd977.firebaseapp.com",
    projectId: "ltnc-232-bd977",
    storageBucket: "ltnc-232-bd977.appspot.com",
    messagingSenderId: "523233987772",
    appId: "1:523233987772:web:060999dfd11999d14254b9"
};  

const firebase = initializeApp(firebaseConfig);

export default firebase;