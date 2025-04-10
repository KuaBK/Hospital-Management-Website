import Nav from "../../hooks/nav";
import UpdateForm from "./updateForm";

import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

function User() {
    const tokenUser = Cookies.get("tokenUser");
    const [info, setInfo] = useState({});

    const [loading, setLoading] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleUpdate = () => {
        setShowUpdate(true);
    }

    const fetchApi = async (setLoading) => {
        setLoading(true);
    
        await axios.get("https://hospital-management-website-gude.onrender.com/user/info", {
            params: {
                tokenUser: tokenUser
            }
        }).then(result => setInfo(result.data));

        if (info != {}) setLoading(false);
    };

    useEffect(() => {
        fetchApi(setLoading);
      }, []
    )

    return (
        <div className="d-flex flex-row" style={{backgroundColor: "#F1F8FF"}}>
            <Nav></Nav>
            <div className="p-5" style={{width: "80%", height: "100vh"}}>
                <div className="card border border-0">
                    <div className="d-flex flex-row justify-content-between align-items-center border-bottom p-3">
                        <h5 className="mx-2 mb-0">Thông tin cá nhân</h5>
                    </div>
                    
                    <div className="px-2" style={{maxHeight: "390px", overflowY: "scroll"}}>
                        <div className="p-3" style={{border: "solid", borderWidth: "0px 0px 1px 0px", borderColor: "#DEE2E6"}}>
                            <button 
                                className="p-2 rounded-2 border-0" 
                                style={{backgroundColor: "#3397F9", color: "white"}}
                                onClick={handleUpdate}
                            >Đổi mật khẩu</button>
                        </div>
                        <div className="d-flex flex-row">
                            <div className="p-3">
                                <p>Họ tên: </p>
                                <p>Email: </p>
                                <p>Số điện thoại: </p>
                            </div>
                            <div className="p-3">
                                <p>{info.name}</p>
                                <p>{info.email}</p>
                                <p>{info.phone_number}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UpdateForm
                showUpdate={showUpdate}
                setShowUpdate={setShowUpdate}
                info={info}
            ></UpdateForm>
        </div>
    )
}

export default User;