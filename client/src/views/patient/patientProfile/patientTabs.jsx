import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Profile from "./profile/profile";
import History from "./history/history";
import Test from "./test/test";

import { getPatientProfile } from "./getPatientProfile";
import { getDoctorList } from "./getDoctorList";
import { fetchHistory } from "./history/fetchHistory.jsx";
import { fetchTest } from "./test/fetchTest.jsx"


function PatientTabs() {
    const patientID = useParams();

    const [data, setData] = useState({});
    const [doctorData, setDoctorData] = useState([]);

    const [history, setHistory] = useState([]);
    const [showAddHistory, setShowAddHistory] = useState(false);
    const [showUpdateHistory, setShowUpdateHistory] = useState(false);
    const [showDeleteHistory, setShowDeleteHistory] = useState(false);

    const [test, setTest] = useState([]);
    const [showAddTest, setShowAddTest] = useState(false);
    const [showUpdateTest, setShowUpdateTest] = useState(false);
    const [showDeleteTest, setShowDeleteTest] = useState(false);

    const [loading, setLoading] = useState(true);

    const [showUpdateProfile, setShowUpdateProfile] = useState(false);

    useEffect(
        () => {
            getPatientProfile(patientID.patientID, data, setData, setLoading);
            getDoctorList(patientID.patientID, doctorData, setDoctorData, setLoading);
            fetchHistory(patientID.patientID, setHistory);
            fetchTest(patientID.patientID, setTest);
        }, [loading, showUpdateProfile, showAddHistory, showUpdateHistory, showDeleteHistory, showAddTest, showUpdateTest, showDeleteTest]
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
                    <Profile 
                        data={data} 
                        showUpdateProfile={showUpdateProfile} 
                        setShowUpdateProfile={setShowUpdateProfile}
                    ></Profile>
                </Tab>
                <Tab eventKey="history" title="Lịch sử bệnh án">
                    <History
                        doctorData={doctorData}
                        history={history}
                        setHistory={setHistory}
                        showAddHistory={showAddHistory}
                        setShowAddHistory={setShowAddHistory}
                        showUpdateHistory={showUpdateHistory}
                        setShowUpdateHistory={setShowUpdateHistory}
                        showDeleteHistory={showDeleteHistory}
                        setShowDeleteHistory={setShowDeleteHistory}
                    ></History>
                </Tab>
                <Tab eventKey="test" title="Kết quả xét nghiệm">
                    <Test 
                        test={test} 
                        showAddTest={showAddTest} 
                        setShowAddTest={setShowAddTest}
                        showUpdateTest={showUpdateTest}
                        setShowUpdateTest={setShowUpdateTest}
                        showDeleteTest={showDeleteTest}
                        setShowDeleteTest={setShowDeleteTest}
                    ></Test>
                </Tab>
                <Tab eventKey="treatment" title="Lịch trình điều trị">
                    
                </Tab>
            </Tabs>
        </>
    )
}

export default PatientTabs;