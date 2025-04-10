import { useState } from "react";
import axios from "axios"

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function UpdateForm({info, showUpdate, setShowUpdate}) {
    const [notification, setNotification] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [reNewPassword, setReNewPassword] = useState("");

    const handleCloseUpdate = () => {
        setShowUpdate(false);
    }

    const handleOldPassword = (e) => {
        const oldPassword = e.target.value;
        setOldPassword(oldPassword);
    }

    const handleNewPassword = (e) => {
        const newPassword = e.target.value;
        setNewPassword(newPassword);
    }

    const handleReNewPassword = (e) => {
        const reNewPassword = e.target.value;
        setReNewPassword(reNewPassword);
    }

    const handleSubmitUpdate = async () => {
        await axios.patch("https://hospital-management-website-gude.onrender.com/user/changePassword", {
            data: {
                id: info._id,
                oldPassword: oldPassword,
                newPassword: newPassword,
                reNewPassword: reNewPassword
            }
        }).then(res => {
            if (res.data == "Success") {
                setNotification("Đổi mật khẩu thành công");
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
            <Modal size="lg" show={showUpdate} onHide={handleCloseUpdate} style={{top: "20%"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Đổi mật khẩu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="oldPasswordForm" >
                            <Form.Label column sm="3">Mật khẩu cũ</Form.Label>
                            <Col sm="9">
                                <Form.Control type="password" placeholder="Mật khẩu cũ" value={oldPassword} onChange={handleOldPassword}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="newPasswordForm" >
                            <Form.Label column sm="3">Mật khẩu mới</Form.Label>
                            <Col sm="9">
                                <Form.Control type="password" placeholder="Mật khẩu mới" value={newPassword} onChange={handleNewPassword}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="reNewPasswordForm" >
                            <Form.Label column sm="3">Nhập lại mật khẩu mới</Form.Label>
                            <Col sm="9">
                                <Form.Control type="password" placeholder="Nhập lại mật khẩu mới" value={reNewPassword} onChange={handleReNewPassword}/>
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