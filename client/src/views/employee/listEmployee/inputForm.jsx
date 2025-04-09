import { useState } from "react";
import axios from "axios"

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import { fetchApi } from "./fetchApi";

function InputForm({showAdd, setShowAdd, searchValue, setLoading, setSearchResult}) {
    const [notification, setNotification] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [name, setName] = useState("");
    const [age, setAge] = useState(1);
    const [gender, setGender] = useState("Chọn giới tính");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [position, setPosition] = useState("Chọn chức vụ");
    const [specialization, setSpecialization] = useState("");

    const handleCloseAdd = () => {
        setShowAdd(false);
        setName("");
        setAge(1);
        setGender("Chọn giới tính");
        setAddress("");
        setPhoneNumber("");
        setPosition("Chọn chức vụ");
        setSpecialization("");
    }

    const handleName = (e) => {
        const name = e.target.value;
        if (!name.startsWith(' ')) {
            setName(name);
        }
    }

    const handleAge = (e) => {
        const age = e.target.value;
        setAge(age);
    }

    const handleGender = (e) => {
        const gender = e.target.value;
        setGender(gender);
    }

    const handleAddress = (e) => {
        const address = e.target.value;
        if (!address.startsWith(' ')) {
            setAddress(address);
        }
    }

    const handlePhoneNumber = (e) => {
        const phoneNumber = e.target.value;
        if ((phoneNumber.startsWith("0") && phoneNumber.length == 1)) {
            setPhoneNumber(phoneNumber);
        } else if ((["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(phoneNumber[phoneNumber.length - 1]) && phoneNumber.length != 1) && phoneNumber.length > 1) {
            setPhoneNumber(phoneNumber);
        } else if (phoneNumber.length == 0) {
            setPhoneNumber("");
        }
    }

    const handlePosition = (e) => {
        const position = e.target.value;
        setPosition(position);
    }

    const handleSpecialization = (e) => {
        const specialization = e.target.value;
        if (!specialization.startsWith(' ')) {
            setSpecialization(specialization);
        }
    }

    const handleSubmitAdd = async () => {
        await axios.post("https://hospital-management-website-v6hl.onrender.com/employee/create", {
            data: {
                name: name,
                age: age,
                gender: gender,
                address: address,
                phone_number: phoneNumber,
                position: position,
                specialization: specialization
            }
        }).then(res => {
            if (res.data == "Success") {
                setNotification("Thêm nhân viên thành công");
                setShowSuccess(true);
                handleCloseAdd();
                fetchApi(searchValue, setLoading, setSearchResult);
            } else {
                setNotification(res.data);
                setShowWarning(true);
            }
        })
    }

    return (
        <>
            <Modal size="lg" show={showAdd} onHide={handleCloseAdd} style={{margin: "auto"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm nhân viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="nameForm" >
                            <Form.Label column sm="2">Họ tên</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Họ tên" value={name} onChange={handleName}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="ageForm">
                            <Form.Label column sm="2">Tuổi</Form.Label>
                            <Col sm="3">
                                <Form.Control value={age} onChange={handleAge} type="number" placeholder="Tuổi" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="genderForm">
                            <Form.Label column sm="2">Giới tính</Form.Label>
                            <Col sm="5">
                                <Form.Select value={gender}  onChange={e => handleGender(e)}>
                                    <option>Chọn giới tính</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="addressForm">
                            <Form.Label column sm="2">Địa chỉ</Form.Label>
                            <Col sm="10">
                                <Form.Control value={address} onChange={handleAddress} type="text" placeholder="Địa chỉ" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="phoneNumberForm">
                            <Form.Label column sm="2">Số điện thoại</Form.Label>
                            <Col sm="5">
                                <Form.Control value={phoneNumber} onChange={handlePhoneNumber} type="tel" placeholder="Số điện thoại" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="genderForm">
                            <Form.Label column sm="2">Chức vụ</Form.Label>
                            <Col sm="5">
                                <Form.Select value={position}  onChange={e => handlePosition(e)}>
                                    <option>Chọn chức vụ</option>
                                    <option value="Bác sĩ">Bác sĩ</option>
                                    <option value="Y tá">Y tá</option>
                                    <option value="Nhân viên khác">Nhân viên khác</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="specializationForm">
                            <Form.Label column sm="2">Chuyên môn</Form.Label>
                            <Col sm="5">
                                <Form.Control value={specialization} onChange={handleSpecialization} type="text" placeholder="Chuyên môn (Chỉ dành cho bác sĩ)" />
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