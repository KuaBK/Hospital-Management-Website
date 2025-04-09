import { useEffect, useState } from "react";
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

import { fetchApi } from "./fetchApi";

function InputForm({showAdd, setShowAdd, searchValue, setLoading, setSearchResult}) {
    const [notification, setNotification] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [availability, setAvailability] = useState("");

    const handleCloseAdd = () => {
        setShowAdd(false);
        setName("");
        setStatus("");
        setAvailability("");
    }

    const handleName = (e) => {
        const name = e.target.value;
        if (!name.startsWith(" ")) {
            setName(name);
        }
    }

    const handleStatus = (e) => {
        const status = e.target.value;
        setStatus(status);
    }

    const handleAvailability = (e) => {
        const availability = e.target.value;
        setAvailability(availability);
    }

    const handleSubmitAdd = async () => {
        await axios.post("https://hospital-management-website-v6hl.onrender.com/device/create", {
            data: {
                name: name,
                status: status,
                availability: availability
            }
        }).then(res => {
            if (res.data == "Success") {
                setNotification("Thêm thiết bị thành công");
                setShowSuccess(true);
                handleCloseAdd();
                fetchApi(searchValue, setLoading, setSearchResult);
            } else  {
                setNotification(res.data);
                setShowWarning(true);
            }
        })
    }

    return (
        <>
            <Modal size="lg" show={showAdd} onHide={handleCloseAdd} style={{top: "20%"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm thuốc mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Tên thiết bị</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Tên thiết bị" value={name} onChange={handleName}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Tình trạng</Form.Label>
                            <Col sm="3">
                                <Form.Select value={status} onChange={handleStatus}>
                                    <option value="Chọn tình trạng">Chọn tình trạng</option>
                                    <option value="Tốt">Tốt</option>
                                    <option value="Không tốt">Không tốt</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Sẵn có</Form.Label>
                            <Col sm="3">
                                <Form.Select value={availability} onChange={handleAvailability}>
                                    <option value="Chọn sẵn có">Chọn sẵn có</option>
                                    <option value="Có">Có</option>
                                    <option value="Không">Không</option>
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