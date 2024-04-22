import { useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';

import InputForm from "./inputForm";
import UpdateForm from "./updateForm.jsx";

import moment from "moment";
import { useState } from "react";
import DeleteForm from "./deleteForm.jsx";
moment().format();

function History({doctorData, history, showAddHistory, setShowAddHistory, showUpdateHistory, setShowUpdateHistory, showDeleteHistory, setShowDeleteHistory}) {
    const patientID = useParams();
    const [doctor, setDoctor] = useState({});
    const [patientData, setPatientData] = useState({});

    const handleCreate = () => {
        setShowAddHistory(true);
    }

    const handleUpdate = (patientData, doctor) => {
        setDoctor(doctor);
        setPatientData(patientData);
        setShowUpdateHistory(true);
    }

    const handleDelete = (patientData, doctor) => {
        setDoctor(doctor);
        setPatientData(patientData);
        setShowDeleteHistory(true);
    }

    return (
        <>
            <div className="card border-1">
                <div className="p-3" style={{border: "solid", borderWidth: "0px 0px 1px 0px", borderColor: "#DEE2E6"}}>
                    <button 
                        className="mx-2 p-2 rounded-2 border-0" 
                        style={{backgroundColor: "#3397F9", color: "white"}}
                        onClick={handleCreate}
                    >Thên bệnh án</button>
                </div>
                <div className="d-flex flex-column">
                    <Accordion style={{maxHeight: "390px", overflowY: "scroll"}}>
                        {history? history.map(data => {
                            return (
                                <Accordion.Item key={data._id} eventKey={data._id}>
                                    <Accordion.Header>{moment(data.date).format("DD-MM-YYYY")}</Accordion.Header>
                                    <Accordion.Body>
                                        {(data.doctor).map(doctor => {
                                            return (
                                                <div key={doctor._id} className="d-flex flex-row justify-content-between">
                                                    <div>
                                                        <p>Bác sĩ điều trị: {doctor.name}</p>
                                                        <p>Phòng khám: {doctor.specialization}</p>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <button className="border border-0 rounded-2 p-2 me-2"
                                                                style={{backgroundColor: "#3497F9", color: "white"}}
                                                                onClick={() => handleUpdate(data, doctor)}>
                                                            Cập nhật
                                                        </button>
                                                        <button className="border border-0 rounded-2 p-2 me-2"
                                                                style={{background: "#FF6558", color: "white"}}
                                                                onClick={() => handleDelete(data, doctor)}>
                                                            Xóa
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        }) : <></>}
                    </Accordion>
                </div>
            </div>
            <InputForm
                patientID={patientID}
                showAddHistory={showAddHistory}
                setShowAddHistory={setShowAddHistory}
                doctorData={doctorData}
            ></InputForm>
            <UpdateForm
                showUpdateHistory={showUpdateHistory}
                setShowUpdateHistory={setShowUpdateHistory}
                doctor={doctor}
                setDoctor={setDoctor}
                patientID={patientID}
                doctorData={doctorData}
            ></UpdateForm>
            <DeleteForm
                showDeleteHistory={showDeleteHistory}
                setShowDeleteHistory={setShowDeleteHistory}
                doctor={doctor}
                setDoctor={setDoctor}
                patientData={patientData}
                setPatientData={setPatientData}
            ></DeleteForm>
        </>
    )
}

export default History;