import { useState, useRef, useEffect } from "react";
import Nav from "../components/nav";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function Patient() {
    const inputRef = useRef();
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inputChange, setInputChange] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [name, setName] = useState("");
    const [age, setAge] = useState(1);
    const [gender, setGender] = useState("Chọn giới tính");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [notification, setNotification] = useState("");
    const [deleteID, setDeleteID] = useState("");

    const fetchApi = async () => {
        setLoading(true);

        await axios.get("http://localhost:3000/patient", {
            params: {
                keyword: searchValue,
            }
        }).then(result => setSearchResult(result.data))
        ;

        console.log(searchResult)

        setLoading(false);
    };

    useEffect(
        () => {
            fetchApi();
        }, [inputChange]
    );

    const handleClear = () => {
        setSearchValue('');
        setInputChange(true);
        inputRef.current.focus();
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleCreate = () => {
        setShowAdd(true);
    }

    const handleCloseAdd = () => {
        setShowAdd(false);
        setName("");
        setAge(1);
        setGender("Chọn giới tính");
        setAddress("");
        setPhoneNumber("");
    }

    const handleSubmit = async () => {
        await axios.post("http://localhost:3000/patient/create", {
            data: {
                name: name,
                age: age,
                gender: gender,
                address: address,
                phone_number: phoneNumber
            }
        }).then(res => {
            console.log(res);
            if (res.data == "Success") {
                setNotification("Thêm bệnh nhân thành công");
                setShowSuccess(true);
                handleCloseAdd();
                fetchApi();
            } else {
                setNotification(res.data);
                setShowWarning(true);
            }
        })
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

    const handleDelete = (id) => {
        setDeleteID(id);
        setShowDelete(true);
    }

    const handleCloseDelete = () => {
        setDeleteID("");
        setShowDelete(false);
    }

    const handleSubmitDelete = async () => {
        await axios.delete("http://localhost:3000/patient/delete/", {
            params: {
                id: deleteID
            }
        }).then(res => console.log(res))
        setNotification("Xóa bệnh nhân thành công");
        setShowSuccess(true);
        handleCloseDelete();
        fetchApi();
    }

    return (
        <div className="d-flex flex-row" style={{backgroundColor: "#F1F8FF"}}>
            <Nav></Nav>
            <div className="col-10 p-5">
                <h3 className="mx-4 mt-2 mb-4">Bệnh nhân</h3>
                <div className="card border border-0">
                    <div className="d-flex flex-row justify-content-between align-items-center mb-3 border-bottom p-3">
                        <h5 className="mx-2 mb-0">Danh sách bệnh nhân</h5>
                        <button 
                            className="d-flex flex-row justify-content-between p-2 me-3 border border-0 rounded-3" 
                            style={{backgroundColor: "#3497F9", color: "white"}}
                            onClick={handleCreate}
                        >
                            <FiPlus size={24}></FiPlus>
                            <p className="mb-0 ms-1">Thêm bệnh nhân</p>
                        </button>
                    </div>
                    <div className="form-group col-4 d-flex flex-row justify-content-start mb-3 p-3">
                        <input 
                            className="form-control shadow-none col-8" 
                            placeholder="Tìm kiếm"
                            style={{borderRadius: "10px", borderTopRightRadius: "0px", borderBottomRightRadius: "0px"}}
                            ref={inputRef}
                            value={searchValue}
                            spellCheck={false}
                            onChange={handleChange}
                            onFocus={() => setShowResult(true)}
                            onKeyDown={() => setInputChange(true)}
                            onKeyUp={() => setInputChange(false)}
                        >
                        </input>
                        <button
                            className="col-3 border border-0"
                            style={{borderRadius: "10px", borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", 
                            backgroundColor: "#3497F9", 
                            color: "white"}}
                            onClick={handleClear}
                        >Xóa</button>
                    </div>
                    {!loading && 
                        <div className="px-3">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">Họ tên</th>
                                        <th scope="col">Tuổi</th>
                                        <th scope="col">Giới tính</th>
                                        <th scope="col">Địa chỉ</th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResult.map((patient) => {
                                        const id = patient._id;
                                        return (
                                            <tr key={patient._id} style={{}}>
                                                <td>{patient.name}</td>
                                                <td>{patient.age}</td>
                                                <td>{patient.gender}</td>
                                                <td>{patient.address}</td>
                                                <td>{patient.phone_number}</td>
                                                <td>
                                                    <button className="border border-0 rounded-2 p-2 me-2" style={{backgroundColor: "#3497F9", color: "white"}}>
                                                        Thông tin
                                                    </button>
                                                    <button className="border border-0 rounded-2 p-2 me-2" style={{background: "#FF6558", color: "white"}} onClick={() => handleDelete(patient._id)
                                                    }>
                                                        Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
            <ToastContainer
            className="p-3"
            position={"top-end"}
            style={{ zIndex: "9999" }}
            >
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
            <Modal size="lg" show={showAdd} onHide={handleCloseAdd} style={{top: "20%"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm bệnh nhân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="nameForm" >
                            <Form.Label column sm="2">Họ tên</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Họ tên" value={name} onChange={handleName}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="nameForm">
                            <Form.Label column sm="2">Tuổi</Form.Label>
                            <Col sm="3">
                                <Form.Control value={age} onChange={handleAge} type="number" placeholder="Tuổi" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="nameForm">
                            <Form.Label column sm="2">Giới tính</Form.Label>
                            <Col sm="5">
                                <Form.Select value={gender}  onChange={e => handleGender(e)}>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="nameForm">
                            <Form.Label column sm="2">Địa chỉ</Form.Label>
                            <Col sm="10">
                                <Form.Control value={address} onChange={handleAddress} type="text" placeholder="Địa chỉ" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="nameForm">
                            <Form.Label column sm="2">Số điện thoại</Form.Label>
                            <Col sm="5">
                                <Form.Control value={phoneNumber} onChange={handlePhoneNumber} type="tel" placeholder="Số điện thoại" />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDelete} onHide={handleCloseDelete} style={{top: "30%"}}>
                <Modal.Header>Xác nhận</Modal.Header>
                <Modal.Body>Bạn có chắc muốn xóa bệnh nhân này khỏi hệ thống?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Patient;