import Patient from '../models/patientModel.js';
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDUoaoiF1Lj6gqkZi2nUSvC16IkgjoCojs",
    authDomain: "ltnc-232-bd977.firebaseapp.com",
    projectId: "ltnc-232-bd977",
    storageBucket: "ltnc-232-bd977.appspot.com",
    messagingSenderId: "523233987772",
    appId: "1:523233987772:web:060999dfd11999d14254b9"
};  
  
const firebase = initializeApp(firebaseConfig);

const db = getFirestore(firebase);

export const getPatient = async (req, res, next) => {
    try {
      const id = req.params.id;
      const patient = doc(db, 'patient', id);
      const data = await getDoc(patient);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('Patient not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
};

export const createPatient = async (req, res, next) => {
    try {
    //   const data = req.body;
      await addDoc(collection(db, 'patients'), {id: "123324", name: "Lan Anh", age: "20", address: "HCM"});
      res.status(200).send('Patient created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
};