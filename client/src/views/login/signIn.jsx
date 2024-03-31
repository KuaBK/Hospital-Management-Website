import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Cookies from "js-cookie";

function SignIn() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(
        () => {
            if (Cookies.get("tokenUser")) {
                return navigate("/");
            }
        }, []
    )

    const handleSignIn = async () => {
        await axios.post("http://localhost:3000/user/signin", {
            data: {
                email: email,
                password: password,
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
                },
            withCredentials: true
        }).then((res) => {
            console.log(res);
            if (res.data == "Success") {
                setNotification("Đăng nhập thành công");
                setShowSuccess(true);
                
                setEmail("");
                setPassword("");

                return navigate("/");
            } else {
                setNotification(res.data);
                setShowWarning(true);
            }
        })
    }

    const handleEmail = (e) => {
        const email = e.target.value;
        if (!email.startsWith(' ')) {
            setEmail(email);
        }
    }

    const handlePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh", backgroundColor: "#F1F8FF"}}>
            <Form className="p-5 rounded-5" style={{width: "30%", backgroundColor: "white"}}>
                <Form.Group className="mb-3" controlId="emailForm">
                    <Form.Label>Địa chỉ Email</Form.Label>
                    <Form.Control type="email" placeholder="Nhập địa chỉ Email" value={email} onChange={handleEmail} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordForm">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Nhập mật khẩu" value={password} onChange={handlePassword} />
                </Form.Group>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <Link to="/user/signup">
                        <p className="mb-0">Chưa có tài khoản?</p>
                    </Link>
                    <Button variant="primary" onClick={handleSignIn}>Đăng nhập</Button>
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

export default SignIn;