import { useState } from "react";
import axios from "axios"

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function UpdateForm({showUpdateTest, setShowUpdateTest, patientID, updateData, setUpdateData}) {
    const [notification, setNotification] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [newName, setNewName] = useState(updateData.name);
    const [newResult, setNewResult] = useState(updateData.result);

    const handleCloseUpdate = () => {
        setShowUpdateTest(false);
        setUpdateData({});
    }

    const handleName = (e) => {
        const newName = e.target.value;
        setNewName(newName);
    }

    const handleResult = (e) => {
        const newResult = e.target.value;
        setNewResult(newResult);
    }

    const handleSubmitUpdate = async () => {
        await axios.patch("http://localhost:3000/test/update", {
            data: {
                patientID: patientID.patientID,
                updateData: updateData,
                name: newName,
                result: newResult
            }
        }).then(res => {
            if (res.data == "Success") {
                setNotification("Cập nhật kết quả xét nghiệm thành công");
                setShowSuccess(true);
                handleCloseUpdate();
            } else {
                setNotification(res.data);
                setShowWarning(true);
            }
        })
    }

    return (
        <>
            <Modal size="lg" show={showUpdateTest} onHide={handleCloseUpdate} style={{top: "20%"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật kết quả xét nghiệm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Xét nghiệm</Form.Label>
                            <Col sm="10">
                                <Form.Select defaultValue={updateData.name} onChange={handleName}>
                                    <option value={"Xét nghiệm máu"}>Xét nghiệm máu</option>
                                    <option value={"Xét nghiệm nước tiểu"}>Xét nghiệm nước tiểu</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Kết quả</Form.Label>
                            <Col sm="5">
                                <Form.Select defaultValue={updateData.result} onChange={handleResult}>
                                    <option value={"Tốt"}>Tốt</option>
                                    <option value={"Không tốt"}>Không tốt</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdate}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSubmitUpdate}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer className="p-3" position={"top-end"} style={{ zIndex: "9999" }}>
                <Toast show={showWarning} onClose={() => setShowWarning(false)} bg="warning" autohide={true} delay={3000}>
                    <Toast.Header>
                    <strong className="me-auto">Thông báo</strong>
                    </Toast.Header>
                    <Toast.Body>{notification}</Toast.Body>
                </Toast>
                <Toast show={showSuccess} onClose={() => setShowSuccess(false)} bg="success" autohide={true} delay={3000}>
                    <Toast.Header>
                    <strong className="me-auto">Thông báo</strong>
                    </Toast.Header>
                    <Toast.Body>{notification}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}

export default UpdateForm;