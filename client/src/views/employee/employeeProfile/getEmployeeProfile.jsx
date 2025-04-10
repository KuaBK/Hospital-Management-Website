import axios from "axios";

export const getEmployeeProfile = async (employeeID, data, setData, setLoading) => {
    await axios.get(`http://localhost:3000/employee/${employeeID}`).then(res => setData(res.data))
    if (data != {}) setLoading(false);
}