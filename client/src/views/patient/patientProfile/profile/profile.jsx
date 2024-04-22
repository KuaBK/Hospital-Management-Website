import { useState } from "react";

import UpdateForm from "./updateForm";

function Profile({data, showUpdateProfile, setShowUpdateProfile}) {
    const [ID, setID] = useState("");
    
    const handleUpdate = () => {
        setID(data._id);
        setShowUpdateProfile(true);
    }

    return (
        <>
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
                        <p>Tình trạng: </p>
                    </div>
                    <div className="p-3">
                        <p>{data.name}</p>
                        <p>{data.age}</p>
                        <p>{data.gender}</p>
                        <p>{data.address}</p>
                        <p>{data.phone_number}</p>
                        <p>{data.status}</p>
                    </div>
                </div>
            </div>
            <UpdateForm
                showUpdateProfile={showUpdateProfile}
                setShowUpdateProfile={setShowUpdateProfile}
                data={data}
            ></UpdateForm>
        </>
    )
}

export default Profile;