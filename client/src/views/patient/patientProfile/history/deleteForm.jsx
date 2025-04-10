import { useState } from "react";
import axios from "axios"

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import patient from "../../patient.jsx";

function DeleteForm({showDeleteHistory, setShowDeleteHistory, doctor, setDoctor, patientData, setPatientData}) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [notification, setNotification] = useState("");

    const handleCloseDelete = () => {
        setDoctor({});
        setPatientData({});
        setShowDeleteHistory(false);
    }

    const handleSubmitDelete = async () => {
        await axios.delete("https://hospital-management-website-gude.onrender.com/history/delete/", {
            data: {
                patientData: patientData,
                doctor: doctor
            }
        })
        setNotification("Xóa lịch sử bệnh án thành công");
        setShowSuccess(true);
        handleCloseDelete();
    }

    return (
        <>
            <Modal show={showDeleteHistory} onHide={handleCloseDelete} style={{top: "30%"}}>
                <Modal.Header>Xác nhận</Modal.Header>
                <Modal.Body>Bạn có chắc muốn xóa lịch sử bệnh án này khỏi hệ thống?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer className="p-3" position={"top-end"} style={{ zIndex: "9999" }}>
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

export default DeleteForm;