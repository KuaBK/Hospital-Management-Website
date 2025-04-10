import { useState } from "react";
import axios from "axios"

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer"

import { fetchApi } from "./fetchApi";

function DeleteForm({showDelete, setShowDelete, ID, setID, searchValue, setLoading, setSearchResult}) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [notification, setNotification] = useState("");

    const handleCloseDelete = () => {
        setID("");
        setShowDelete(false);
    }

    const handleSubmitDelete = async () => {
        await axios.delete("https://hospital-management-website-gude.onrender.com/medicine/delete/", {
            params: {
                id: ID
            }
        })
        setNotification("Xóa thuốc thành công");
        setShowSuccess(true);
        handleCloseDelete();
        fetchApi(searchValue, setLoading, setSearchResult);
    }

    return (
        <>
            <Modal show={showDelete} onHide={handleCloseDelete} style={{top: "30%"}}>
                <Modal.Header>Xác nhận</Modal.Header>
                <Modal.Body>Bạn có chắc muốn xóa thuốc này khỏi hệ thống?</Modal.Body>
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