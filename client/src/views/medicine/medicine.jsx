import Nav from "../../hooks/nav";

import { Outlet } from "react-router-dom";

function Medicine() {
    return (
        <div className="d-flex flex-row" style={{backgroundColor: "#F1F8FF"}}>
            <Nav></Nav>
            <Outlet></Outlet>
        </div>
    )
}

export default Medicine;