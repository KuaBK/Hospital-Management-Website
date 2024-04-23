import { Outlet } from "react-router-dom";
import Nav from "../../hooks/nav";

function Device() {
    return (
        <div className="d-flex flex-row" style={{backgroundColor: "#F1F8FF"}}>
            <Nav></Nav>
            <Outlet></Outlet>
        </div>
    )
}

export default Device;