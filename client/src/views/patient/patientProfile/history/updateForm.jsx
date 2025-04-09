import { useState } from "react";
import axios from "axios"

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function UpdateForm({showUpdateHistory, setShowUpdateHistory, doctor, setDoctor, patientID, doctorData}) {
    const [notification, setNotification] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [newDoctorID, setNewDoctorID] = useState("");

    const handleCloseUpdate = () => {
        setShowUpdateHistory(false);
        setDoctor({})
        setNewDoctorID("");
    }

    const handleDoctor = (e) => {
        const newDoctorID = e.target.options[e.target.options.selectedIndex].getAttribute("data-key");
        setNewDoctorID(newDoctorID);
    }

    const handleSubmitUpdate = async () => {
        await axios.patch("https://hospital-management-website-v6hl.onrender.com/history/update", {
            data: {
                patientID: patientID.patientID,
                doctorID: doctor._id,
                newDoctorID: newDoctorID
            }
        }).then(res => {
            if (res.data == "Success") {
                setNotification("Cập nhật lịch sử bệnh án thành công");
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
            <Modal size="lg" show={showUpdateHistory} onHide={handleCloseUpdate} style={{top: "20%"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật lịch sử bệnh án</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Bác sĩ</Form.Label>
                            <Col sm="10">
                                <Form.Select defaultValue={doctor.name}  onChange={handleDoctor}>
                                    {doctorData.map((doctor) => {
                                        return (
                                            <option key={doctor._id} data-key={doctor._id}>{doctor.name}</option>
                                        )
                                    })}
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