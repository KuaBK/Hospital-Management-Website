import Nav from "../../hooks/nav";

import { Outlet } from "react-router-dom";

function Employee() {
    return (
        <div className="d-flex flex-row" style={{backgroundColor: "#F1F8FF"}}>
            <Nav></Nav>
            <Outlet></Outlet>
        </div>
    )
}

export default Employee;