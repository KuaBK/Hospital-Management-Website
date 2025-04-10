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

function UpdateForm({showUpdate, setShowUpdate, ID, setID, searchValue, setLoading, setSearchResult}) {
    const [notification, setNotification] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [quantity, setQuantity] = useState(1);
    const [expire, setExpire] = useState("");

    const handleCloseUpdate = () => {
        setID("");
        setShowUpdate(false);
        setQuantity(1);
        setExpire("");
    }

    const handleQuantity = (e) => {
        const quantity = e.target.value;
        if (!quantity.startsWith("0")) {
            setQuantity(quantity);
        }
    }

    const handleExpire = (e) => {
        const expire = e.target.value;
        setExpire(expire);
    }

    const handleSubmitUpdate = async () => {
        await axios.patch("http://localhost:3000/medicine/update", {
            data: {
                id: ID,
                data: {
                    quantity: quantity,
                    expire: expire
                }
            }
        }).then(res => {
            if (res.data == "Success") {
                setNotification("Thêm số lượng thuốc thành công");
                setShowSuccess(true);
                handleCloseUpdate();
                fetchApi(searchValue, setLoading, setSearchResult);
            } else  {
                setNotification(res.data);
                setShowWarning(true);
            }
        })
    }

    return (
        <>
            <Modal size="lg" show={showUpdate} onHide={handleCloseUpdate} style={{top: "20%"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm số lượng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Số lượng</Form.Label>
                            <Col sm="3">
                                <Form.Control value={quantity} onChange={handleQuantity} type="number" placeholder="Số lượng" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Hạn sử dụng</Form.Label>
                            <Col sm="3">
                            <Form.Control 
                                type="date"
                                value={expire}
                                min={moment().format("YYYY-MM-DD")}
                                onChange={handleExpire}
                            />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdate}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSubmitUpdate}>
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

export default UpdateForm;