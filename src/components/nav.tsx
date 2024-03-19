import { NavLink } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { FaSuitcaseMedical } from "react-icons/fa6";

import logo from "../assets/hcmut.png";

function Nav() {
    return (
        <div className="col d-flex flex-column justify-content-between" style={{backgroundColor: "white"}}>
            <div className="d-flex flex-row justify-content-between align-items-center px-2 py-5">
                <img src={logo} className="" style={{width: "50px"}}></img>
                <h5 className="mb-0" style={{color: "#3497F9"}}>HCMUT Hospital</h5>
            </div>
            <div id="sidebar" className="d-flex flex-column justify-content-center align-items-center">
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
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center p-3 my-5 border border-1">
                <p className="mb-0">Đăng nhập/Đăng ký</p>
            </div>
        </div>
    )
}

export default Nav;