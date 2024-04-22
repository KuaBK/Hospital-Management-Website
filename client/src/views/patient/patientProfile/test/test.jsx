import { useState } from "react";
import { useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';

import InputForm from "./inputForm";
import UpdateForm from "./updateForm";
import DeleteForm from "./deleteForm";

import moment from "moment";

moment().format();

function Test({test, showAddTest, setShowAddTest, showUpdateTest, setShowUpdateTest, showDeleteTest, setShowDeleteTest}) {
    const patientID = useParams();

    const [updateData, setUpdateData] = useState({});
    const [deleteID, setDeleteID] = useState("");

    const handleCreate = () => {
        setShowAddTest(true);
    }

    const handleUpdate = (updateData) => {
        setShowUpdateTest(true);
        setUpdateData(updateData);
        console.log(updateData)
    }

    const handleDelete = (deleteID) => {
        setShowDeleteTest(true);
        setDeleteID(deleteID);
    }

    return (
        <>
            <div className="card border-1">
                <div className="p-3" style={{border: "solid", borderWidth: "0px 0px 1px 0px", borderColor: "#DEE2E6"}}>
                    <button 
                        className="mx-2 p-2 rounded-2 border-0" 
                        style={{backgroundColor: "#3397F9", color: "white"}}
                        onClick={handleCreate}
                    >Thên kết quả xét nghiệm</button>
                </div>
                <div className="d-flex flex-column">
                    <Accordion style={{maxHeight: "390px", overflowY: "scroll"}}>
                        {test? test.map(data => {
                            return (
                                <Accordion.Item key={data._id} eventKey={data._id}>
                                    <Accordion.Header>{moment(data.date).format("DD-MM-YYYY")}</Accordion.Header>
                                    <Accordion.Body>
                                        {(data.data).map(test => {
                                            return (
                                                <div key={test._id} className="d-flex flex-row justify-content-between">
                                                    <div>
                                                        <p>Tên: {test.name}</p>
                                                        <p>Kết quả: {test.result}</p>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <button className="border border-0 rounded-2 p-2 me-2"
                                                                style={{backgroundColor: "#3497F9", color: "white"}}
                                                                onClick={() => handleUpdate(test, data)}>
                                                            Cập nhật
                                                        </button>
                                                        <button className="border border-0 rounded-2 p-2 me-2"
                                                                style={{background: "#FF6558", color: "white"}}
                                                                onClick={() => handleDelete(test._id)}>
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
                showAddTest={showAddTest}
                setShowAddTest={setShowAddTest}
            ></InputForm>
            <UpdateForm
                patientID={patientID}
                updateData={updateData}
                setUpdateData={setUpdateData}
                showUpdateTest={showUpdateTest}
                setShowUpdateTest={setShowUpdateTest}
                showDeleteTest={showDeleteTest}
            >
            </UpdateForm>
            <DeleteForm
                patientID={patientID}
                deleteID={deleteID}
                setDeleteID={setDeleteID}
                showDeleteTest={showDeleteTest}
                setShowDeleteTest={setShowDeleteTest}
            ></DeleteForm>
        </>
    )
}

export default Test;