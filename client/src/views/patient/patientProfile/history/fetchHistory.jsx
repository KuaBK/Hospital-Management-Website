import axios from "axios";

export const fetchHistory = async (patientID, setHistory) => {
    await axios.get("http://localhost:3000/history", {
        params: {
            patientID: patientID,
        }
    }).then(result => {
        setHistory(result.data);
    });
};