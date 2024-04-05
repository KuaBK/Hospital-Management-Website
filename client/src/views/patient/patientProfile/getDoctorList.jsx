import axios from "axios";

export const getDoctorList = async (patientID, data, setData, setLoading) => {
    await axios.get(`http://localhost:3000/patient/${patientID}/getDoctorList`).then(res => setData(res.data))
    if (data != []) setLoading(false);
}