import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Cookies from "js-cookie";

function SignUp() {
    const [notification, setNotification] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(
        () => {
            if (Cookies.get("tokenUser")) {
                return navigate("/");
            }
        }, []
    )
    
    const handleSignUp = async () => {
        await axios.post("https://hospital-management-website-gude.onrender.com/user/signup", {
            data: {
                name: name,
                email: email,
                phone_number: phoneNumber,
                password: password,
                re_password: rePassword
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then((res) => {
            console.log(res);
            if (res.data == "Success") {
                setNotification("Đăng ký thành công");
                setShowSuccess(true);
                
                setName("");
                setEmail("");
                setPhoneNumber("");
                setPassword("");
                setRePassword("");

                return navigate("/");
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

    const handleEmail = (e) => {
        const email = e.target.value;
        if (!email.startsWith(' ')) {
            setEmail(email);
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

    const handlePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleRePassword = (e) => {
        const rePassword = e.target.value;
        setRePassword(rePassword);
    }

    // useEffect(
    //     () => {
            
    //     }
    // )

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh", backgroundColor: "#F1F8FF"}}>
            <Form className="p-5 rounded-5" style={{width: "30%", backgroundColor: "white"}}>
                <Form.Group className="mb-3" controlId="nameForm" >
                    <Form.Label>Họ tên</Form.Label>
                    <Form.Control type="text" placeholder="Họ tên" value={name} onChange={handleName} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="emailForm">
                    <Form.Label>Địa chỉ Email</Form.Label>
                    <Form.Control type="email" placeholder="Nhập địa chỉ Email" value={email} onChange={handleEmail} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phoneNumberForm">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control type="string" placeholder="Nhập số điện thoại" value={phoneNumber} onChange={handlePhoneNumber} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordForm">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Nhập mật khẩu" value={password} onChange={handlePassword} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="rePasswordForm">
                    <Form.Label>Nhập lại mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Nhập lại mật khẩu" value={rePassword} onChange={handleRePassword} />
                </Form.Group>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <Link to="/user/signin">
                        <p className="mb-0">Đã có tài khoản?</p>
                    </Link>
                    <Button variant="primary" onClick={handleSignUp}>Đăng ký</Button>
                </div>
            </Form>
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
        </div>
    )
}

export default SignUp;