import { useState } from "react";
import axios from "axios"

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import patient from "../../patient.jsx";

function DeleteForm({showDeleteTest, setShowDeleteTest, patientID, deleteID, setDeleteID}) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [notification, setNotification] = useState("");

    const handleCloseDelete = () => {
        setDeleteID("");
        setShowDeleteTest(false);
    }

    const handleSubmitDelete = async () => {
        await axios.delete("https://hospital-management-website-v6hl.onrender.com/test/delete/", {
            data: {
                patientID: patientID.patientID,
                deleteID: deleteID
            }
        })
        setNotification("Xóa kết quả xét nghiệm thành công");
        setShowSuccess(true);
        handleCloseDelete();
    }

    return (
        <>
            <Modal show={showDeleteTest} onHide={handleCloseDelete} style={{top: "30%"}}>
                <Modal.Header>Xác nhận</Modal.Header>
                <Modal.Body>Bạn có chắc muốn xóa kết quả xét nghiệm này khỏi hệ thống?</Modal.Body>
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