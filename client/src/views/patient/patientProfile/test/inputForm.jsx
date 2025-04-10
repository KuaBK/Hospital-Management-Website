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
moment().format();

function InputForm({patientID, showAddTest, setShowAddTest}) {
    const [notification, setNotification] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [result, setResult] = useState("");

    const handleCloseAdd = () => {
        setShowAddTest(false);
        setDate("");
        setName("");
        setResult("");
    }

    const handleDate = (e) => {
        const date = e.target.value;
        setDate(date);
    }

    const handleName = (e) => {
        const name = e.target.value;
        setName(name);
    }

    const handleResult = (e) => {
        const result = e.target.value;
        setResult(result);
    }

    const handleSubmitAdd = async () => {
        await axios.post(`https://hospital-management-website-gude.onrender.com/test/create`, {
            data: {
                patientID: patientID.patientID,
                date: date,
                data: {
                    name: name,
                    result: result,
                }
            }
        }).then(res => {
            if (res.data == "Success") {
                setNotification("Thêm kết quả xét nghiệm thành công");
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
            <Modal size="lg" show={showAddTest} onHide={handleCloseAdd} style={{top: "20%"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm kết quả xét nghiệm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">Ngày</Form.Label>
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
                            <Form.Label column sm="3">Tên xét nghiệm</Form.Label>
                            <Col sm="5">
                                <Form.Select value={name}  onChange={e => handleName(e)}>
                                    <option>Chọn xét nghiệm</option>
                                    <option>Xét nghiệm máu</option>
                                    <option>Xét nghiệm nước tiểu</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="nameForm" >
                            <Form.Label column sm="3">Kết quả</Form.Label>
                            <Col sm="5">
                                <Form.Select value={result}  onChange={e => handleResult(e)}>
                                    <option>Chọn kết quả</option>
                                    <option>Tốt</option>
                                    <option>Không tốt</option>
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