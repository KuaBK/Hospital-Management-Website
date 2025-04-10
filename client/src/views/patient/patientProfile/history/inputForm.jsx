import { useState } from "react";
import axios from "axios"

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import moment from 'moment';
import patient from "../../patient.jsx";
moment().format();

function InputForm({patientID, showAddHistory, setShowAddHistory, doctorData}) {
    const [notification, setNotification] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [date, setDate] = useState("");
    const [doctor, setDoctor] = useState("")

    const handleCloseAdd = () => {
        setShowAddHistory(false);
        setDate("");
        setDoctor("");
    }

    const handleDate = (e) => {
        const date = e.target.value;
        setDate(date);
    }

    const handleDoctor = (e) => {
        const doctor = e.target.value;
        setDoctor(doctor);
    }

    const handleSubmitAdd = async () => {
        await axios.post('https://hospital-management-website-gude.onrender.com/history/create', {
            data: {
                patientID: patientID.patientID,
                date: date,
                doctorID: (doctorData.find(o => o.name == doctor))._id
            }
        }).then(res => {
            if (res.data == "Success") {
                setNotification("Thêm bệnh án thành công");
                setShowSuccess(true);
                handleCloseAdd();
            } else {
                setNotification(res.data);
                setShowWarning(true);
            }
        })
    }

    return (
        <>
            <Modal size="lg" show={showAddHistory} onHide={handleCloseAdd} style={{top: "20%"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm bệnh án</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Ngày</Form.Label>
                            <Col sm="3">
                                <Form.Control 
                                    type="date"
                                    value={date}
                                    min={moment().format("YYYY-MM-DD")}
                                    onChange={handleDate}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="nameForm" >
                            <Form.Label column sm="2">Bác sĩ</Form.Label>
                            <Col sm="5">
                                <Form.Select value={doctor}  onChange={e => handleDoctor(e)}>
                                    <option>Chọn bác sĩ</option>
                                    {doctorData.map((doctor) => {
                                        return (
                                            <option key={doctor._id}>{doctor.name}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSubmitAdd}>
                        Thêm
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

export default InputForm;