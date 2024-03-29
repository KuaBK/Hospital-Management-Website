import { Link } from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function PatientDetailTabs({data}) {
    const link = `/patient/${data._id}/update`
    const handleUpdate = () => {
        console.log("Run update")
    }

    return (
        <>
            <style type="text/css">
                {`
                    .nav-tabs {
                        border-bottom: 0px;
                        --bs-nav-tabs-link-active-bg: none;
                        --bs-nav-tabs-link-active-color: black;
                    }

                    .nav-tabs .nav-link {
                        border-width: 0px;
                    }

                    .nav-tabs .nav-link.active {
                        border-width: 0px 0px 5px 0px;
                        border-color: #3397F9;
                        color: #3397F9;
                    }

                    .nav-link {
                        color: #7F8E98;
                        background-color: white;
                        transition: none;
                    }
                    .nav-link:hover {
                        color: black;
                    }

                    .nav-link.active {
                        font-weight: 700;
                    }
                    
                    .card {
                        border-radius: 0rem .375rem .375rem .375rem;
                    }
                    
                `}
            </style>
            <Tabs
            defaultActiveKey="profile"
            className=""
            >
                <Tab eventKey="profile" title="Thông tin cá nhân">
                    <div className="card border-1">
                        <div className="p-3" style={{border: "solid", borderWidth: "0px 0px 1px 0px", borderColor: "#DEE2E6"}}>
                            <Link to={link}>
                                <button 
                                    className="p-2 rounded-2 border-0" 
                                    style={{backgroundColor: "#3397F9", color: "white"}}
                                    onClick={handleUpdate}
                                >Cập nhật thông tin</button>
                            </Link>
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
                </Tab>
                <Tab eventKey="history" title="Lịch sử bệnh án">

                </Tab>
                <Tab eventKey="test" title="Kết quả xét nghiệm">

                </Tab>
                <Tab eventKey="treatment" title="Lịch trình điều trị">
                    
                </Tab>
            </Tabs>
        </>
    )
}

export default PatientDetailTabs;