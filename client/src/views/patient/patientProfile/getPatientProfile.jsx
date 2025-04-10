import axios from "axios";

export const getPatientProfile = async (patientID, data, setData, setLoading) => {
    await axios.get(`http://localhost:3000/patient/${patientID}`).then(res => setData(res.data))
    if (data != {}) setLoading(false);
}