import { Outlet } from "react-router-dom";

function PatientDetail() {
    return (
        <div className="p-5" style={{width: "80%"}}>
            <h3 className="mx-4 mt-2 mb-4">Thông tin bệnh nhân</h3>
            <Outlet></Outlet>
        </div>
    )
}

export default PatientDetail;