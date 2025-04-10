import { NavLink, Link } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { FaSuitcaseMedical } from "react-icons/fa6";
import { RiProfileLine } from "react-icons/ri";

import logo from "../assets/hcmut.png";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Cookies from "js-cookie";

function Nav() {
    const navigate = useNavigate();
    const tokenUser = Cookies.get("tokenUser");
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleUser = async () => {
        await axios.get("https://hospital-management-website-gude.onrender.com/user", {
          params: {
            tokenUser: tokenUser
          }
        }).then(res => {
            setUserData(res.data);
        });
        if (userData != []) setLoading(false);
    }

    const handleSignOut = async () => {
        await axios.get("https://hospital-management-website-gude.onrender.com/user/signout", {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then((res) => {
            if (res.data == "Success") {
                return navigate("/user/signin")
            }
        });
    }

    useEffect(
        () => {
            handleUser();
        }, [loading]
    )

    return (
        <div className="d-flex flex-column justify-content-start" style={{backgroundColor: "white", height: "100vh", width: "20%"}}>
            <div className="d-flex flex-row justify-content-center align-items-center px-2 pt-5" style={{marginBottom: "auto"}}>
                <img src={logo} className="me-2" style={{width: "50px"}}></img>
                <h5 className="mb-0 ms-2" style={{color: "#3497F9"}}>HCMUT Hospital</h5>
            </div>
            <div id="sidebar" className="d-flex flex-column justify-content-center align-items-center" style={{marginBottom: "auto"}}>
                <NavLink
                    to="/"
                    style={({ isActive }) => {
                        return {
                            textDecoration: "none", 
                            width: "100%",
                            backgroundColor: isActive? "#E7F3FE": "white",
                            color: isActive? "#3397F9": "#7F8E98",
                            borderLeftStyle: isActive? "solid": "none",
                            borderLeftWidth: isActive? "5px": "0px",
                        };
                    }}
                    className={({ isActive }) =>
                        [
                        isActive ? "fw-bolder" : "",
                        "d-flex flex-row justify-content-start align-items-center"
                        ].join(" ")
                    }
                >
                    <MdOutlineSpaceDashboard size={30} className="ms-4"></MdOutlineSpaceDashboard> 
                    <p className="text-center px-2 py-3 my-2">Trang chủ</p>
                </NavLink>
                <NavLink 
                    to="/patient"
                    style={({ isActive }) => {
                        return {
                            textDecoration: "none", 
                            width: "100%",
                            backgroundColor: isActive? "#E7F3FE": "white",
                            color: isActive? "#3397F9": "#7F8E98",
                            borderLeftStyle: isActive? "solid": "none",
                            borderLeftWidth: isActive? "5px": "0px",
                        };
                    }}
                    className={({ isActive }) =>
                        [
                        isActive ? "fw-bolder" : "",
                        "d-flex flex-row justify-content-start align-items-center",
                        ].join(" ")
                    }
                >
                    <HiOutlineUserGroup size={30} className="ms-4"></HiOutlineUserGroup>
                    <p className="text-center px-2 py-3 my-2">Bệnh nhân</p>
                </NavLink>
                <NavLink 
                    to="/employee"
                    style={({ isActive }) => {
                        return {
                            textDecoration: "none", 
                            width: "100%",
                            backgroundColor: isActive? "#E7F3FE": "white",
                            color: isActive? "#3397F9": "#7F8E98",
                            borderLeftStyle: isActive? "solid": "none",
                            borderLeftWidth: isActive? "5px": "0px",
                        };
                    }}
                    className={({ isActive }) =>
                        [
                        isActive ? "fw-bolder" : "",
                        "d-flex flex-row justify-content-start align-items-center",
                        ].join(" ")
                    }
                >
                    <FaUserDoctor size={30} className="ms-4"></FaUserDoctor>
                    <p className="text-center px-2 py-3 my-2">Nhân viên</p>
                </NavLink>
                <NavLink 
                    to="/medicine"
                    style={({ isActive }) => {
                        return {
                            textDecoration: "none", 
                            width: "100%",
                            backgroundColor: isActive? "#E7F3FE": "white",
                            color: isActive? "#3397F9": "#7F8E98",
                            borderLeftStyle: isActive? "solid": "none",
                            borderLeftWidth: isActive? "5px": "0px",
                        };
                    }}
                    className={({ isActive }) =>
                        [
                        isActive ? "fw-bolder" : "",
                        "d-flex flex-row justify-content-start align-items-center",
                        ].join(" ")
                    }
                >
                    <GiMedicines size={30} className="ms-4"></GiMedicines>
                    <p className="text-center px-2 py-3 my-2">Thuốc</p>
                </NavLink>
                <NavLink 
                    to="/device"
                    style={({ isActive }) => {
                        return {
                            textDecoration: "none", 
                            width: "100%",
                            backgroundColor: isActive? "#E7F3FE": "white",
                            color: isActive? "#3397F9": "#7F8E98",
                            borderLeftStyle: isActive? "solid": "none",
                            borderLeftWidth: isActive? "5px": "0px",
                        };
                    }}
                    className={({ isActive }) =>
                        [
                        isActive ? "fw-bolder" : "",
                        "d-flex flex-row justify-content-start align-items-center",
                        ].join(" ")
                    }
                >
                    <FaSuitcaseMedical size={30} className="ms-4"></FaSuitcaseMedical>
                    <p className="text-center p-3 my-2">Trang thiết bị</p>
                </NavLink>
                <NavLink 
                    to="/user"
                    style={({ isActive }) => {
                        return {
                            textDecoration: "none", 
                            width: "100%",
                            backgroundColor: isActive? "#E7F3FE": "white",
                            color: isActive? "#3397F9": "#7F8E98",
                            borderLeftStyle: isActive? "solid": "none",
                            borderLeftWidth: isActive? "5px": "0px",
                        };
                    }}
                    className={({ isActive }) =>
                        [
                        isActive ? "fw-bolder" : "",
                        "d-flex flex-row justify-content-start align-items-center",
                        ].join(" ")
                    }
                >
                    <RiProfileLine size={30} className="ms-4"></RiProfileLine>
                    <p className="text-center p-3 my-2">Thông tin cá nhân</p>
                </NavLink>
            </div>
            <div className="">
                <button className="border-0" style={{height: "10vh", width: "100%", backgroundColor: "white"}} onClick={handleSignOut}>
                    <p className="mb-0 fw-bolder" style={{color: "#3397F9"}}>Đăng xuất</p>
                </button>
            </div>
        </div>
    )
}

export default Nav;