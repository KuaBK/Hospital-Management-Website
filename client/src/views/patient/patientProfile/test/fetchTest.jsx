import axios from "axios";

export const fetchTest = async (patientID, setTest) => {
    await axios.get("https://hospital-management-website-gude.onrender.com/test", {
        params: {
            patientID: patientID,
        }
    }).then(result => {
        setTest(result.data);
    });
};