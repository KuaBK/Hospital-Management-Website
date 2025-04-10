import axios from "axios";

export const getDoctorList = async (patientID, data, setData, setLoading) => {
    await axios.get(`https://hospital-management-website-gude.onrender.com/patient/${patientID}/getDoctorList`).then(res => setData(res.data))
    if (data != []) setLoading(false);
}