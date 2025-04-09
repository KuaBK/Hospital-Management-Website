import axios from "axios";

export const getEmployeeProfile = async (employeeID, data, setData, setLoading) => {
    await axios.get(`https://hospital-management-website-v6hl.onrender.com/employee/${employeeID}`).then(res => setData(res.data))
    if (data != {}) setLoading(false);
}