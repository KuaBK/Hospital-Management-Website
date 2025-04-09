import { useState } from "react";
import axios from "axios"

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer"

import { fetchApi } from "./fetchApi";

function DeleteForm({showDelete, setShowDelete, deleteID, setDeleteID, searchValue, setLoading, setSearchResult}) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [notification, setNotification] = useState("");

    const handleCloseDelete = () => {
        setDeleteID("");
        setShowDelete(false);
    }

    const handleSubmitDelete = async () => {
        await axios.delete("https://hospital-management-website-v6hl.onrender.com/employee/delete/", {
            params: {
                id: deleteID
            }
        })
        setNotification("Xóa nhân viên thành công");
        setShowSuccess(true);
        handleCloseDelete();
        fetchApi(searchValue, setLoading, setSearchResult);
    }

    return (
        <>
            <Modal show={showDelete} onHide={handleCloseDelete} style={{top: "30%"}}>
                <Modal.Header>Xác nhận</Modal.Header>
                <Modal.Body>Bạn có chắc muốn xóa nhân viên này khỏi hệ thống?</Modal.Body>
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