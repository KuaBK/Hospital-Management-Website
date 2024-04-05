import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Profile from "./profile";
import History from "./history";
import { getPatientProfile } from "./getPatientProfile";
import { getOverlayDirection } from "react-bootstrap/esm/helpers";
import { getDoctorList } from "./getDoctorList";


function PatientTabs() {
    const {patientID} = useParams();
    const [data, setData] = useState({});
    const [doctorData, setDoctorData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const [showAddHistory, setShowAddHistory] = useState(false);

    useEffect(
        () => {
            getPatientProfile(patientID, data, setData, setLoading);
            getDoctorList(patientID, doctorData, setDoctorData, setLoading)
        }, [loading, showUpdateProfile, showAddHistory]
    )

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
                    <Profile data={data} showUpdateProfile={showUpdateProfile} setShowUpdateProfile={setShowUpdateProfile}></Profile>
                </Tab>
                <Tab eventKey="history" title="Lịch sử bệnh án">
                    <History data={data} doctorData={doctorData} showAddHistory={showAddHistory} setShowAddHistory={setShowAddHistory}></History>
                </Tab>
                <Tab eventKey="test" title="Kết quả xét nghiệm">

                </Tab>
                <Tab eventKey="treatment" title="Lịch trình điều trị">
                    
                </Tab>
            </Tabs>
        </>
    )
}

export default PatientTabs;