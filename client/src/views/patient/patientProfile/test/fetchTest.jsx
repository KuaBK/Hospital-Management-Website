import axios from "axios";

export const fetchTest = async (patientID, setTest) => {
    await axios.get("http://localhost:3000/test", {
        params: {
            patientID: patientID,
        }
    }).then(result => {
        setTest(result.data);
    });
};