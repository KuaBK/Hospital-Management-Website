import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';

import InputForm from "./inputForm";

import moment from "moment";
moment().format();

function History({data, doctorData, showAddHistory, setShowAddHistory}) {
    const patientID = useParams();

    const handleCreate = () => {
        setShowAddHistory(true);
    }

    const handleUpdate = () => {

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
                    <button 
                        className="mx-2 p-2 rounded-2 border-0" 
                        style={{backgroundColor: "#3397F9", color: "white"}}
                        onClick={handleUpdate}
                    >Cập nhật bệnh án</button>
                </div>
                <div className="d-flex flex-column">
                    <Accordion defaultActiveKey="0">
                        {(data.history)? (data.history).map((history) => {
                            return (
                                <Accordion.Item>
                                    <Accordion.Header>{moment(history.date).format("DD-MM-YYYY")}</Accordion.Header>
                                    <Accordion.Body>
                                        <p>Bác sĩ điều trị: {history.doctor[0].name}</p>
                                        <p>Phòng khám: {history.doctor[0].specialization}</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        }): <></>}
                        {/* <Accordion.Item eventKey="0">
                            <Accordion.Header>Accordion Item #1</Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item> */}
                    </Accordion>
                </div>
            </div>
            <InputForm
                patientID={patientID}
                showAddHistory={showAddHistory}
                setShowAddHistory={setShowAddHistory}
                doctorData={doctorData}
                data={data}
            ></InputForm>
        </>
    )
}

export default History;