import { BrowserRouter, Routes, Route } from "react-router-dom";
import Patient from "../views/pages/patient";
import Home from "../views/pages/home";
import Employee from "../views/pages/employee";
import Medicine from "../views/pages/medicine";
import Device from "../views/pages/device";

function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Home}></Route>
                <Route path="/patient" Component={Patient}></Route>
                <Route path="/employee" Component={Employee}></Route>
                <Route path="/medicine" Component={Medicine}></Route>
                <Route path="/device" Component={Device}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Root;