const express = require("express")
const cors = require("cors")
const serviceAccount = require("../ltnc-232-bd977-73182fa4b811.json")
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const app = express()

const firebase = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore(firebase)

app.use(cors())

app.listen(3000, () => {
    console.log("App listening on port 3000")
})

// app.use('/patient', getPatient)
app.get('/patient', async (req, res, next) => {
  try {
    const patients = db.collection('patient').doc("qG8JU5iSOeeYc0yr81CY");
    const doc = await patients.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      const data = doc.data()
      res.json(data)
    }
    // res.json()
  } catch(error) {
    console.log(error)
  }
})