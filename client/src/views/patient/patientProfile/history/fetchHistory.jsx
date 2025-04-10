import axios from "axios";

export const fetchHistory = async (patientID, setHistory) => {
    await axios.get("https://hospital-management-website-gude.onrender.com/history", {
        params: {
            patientID: patientID,
        }
    }).then(result => {
        setHistory(result.data);
    });
};