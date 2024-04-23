import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import UpdateForm from "./updateForm";

import { getEmployeeProfile } from "./getEmployeeProfile";

function EmployeeDetail() {
    const employeeID = useParams();
    const [loading, setLoading] = useState();
    const [data, setData] = useState({});

    const [showUpdateProfile, setShowUpdateProfile] = useState(false);

    const handleUpdate = () => {
        setShowUpdateProfile(true);
    }

    useEffect(
        () => {
            getEmployeeProfile(employeeID.employeeID, data, setData, setLoading);
        }, [loading, showUpdateProfile]
    );

    return (
        <div className="p-5" style={{width: "80%"}}>
            <h3 className="mx-4 mt-2 mb-4">Thông tin nhân viên</h3>
            <div className="card border-1">
                <div className="p-3" style={{border: "solid", borderWidth: "0px 0px 1px 0px", borderColor: "#DEE2E6"}}>
                    <button 
                        className="p-2 rounded-2 border-0" 
                        style={{backgroundColor: "#3397F9", color: "white"}}
                        onClick={handleUpdate}
                    >Cập nhật thông tin</button>
                </div>
                <div className="d-flex flex-row">
                    <div className="p-3">
                        <p>Họ tên: </p>
                        <p>Tuổi: </p>
                        <p>Giới tính: </p>
                        <p>Địa chỉ: </p>
                        <p>Số điện thoại: </p>
                        <p>Chức vụ: </p>
                        <p>Chuyên môn: </p>
                    </div>
                    <div className="p-3">
                        <p>{data.name}</p>
                        <p>{data.age}</p>
                        <p>{data.gender}</p>
                        <p>{data.address}</p>
                        <p>{data.phone_number}</p>
                        <p>{data.position}</p>
                        <p>{data.specialization}</p>
                    </div>
                </div>
            </div>
            <UpdateForm
                showUpdateProfile={showUpdateProfile}
                setShowUpdateProfile={setShowUpdateProfile}
                data={data}
            ></UpdateForm>
        </div>
    )
}

export default EmployeeDetail;