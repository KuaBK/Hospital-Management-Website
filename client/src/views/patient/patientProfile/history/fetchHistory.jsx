import axios from "axios";

export const fetchHistory = async (patientID, setHistory) => {
    await axios.get("https://hospital-management-website-v6hl.onrender.com/history", {
        params: {
            patientID: patientID,
        }
    }).then(result => {
        setHistory(result.data);
    });
};