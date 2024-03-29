import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";

import { getPatientProfile } from "../../../hooks/getPatientProfile";

function PatientDetail() {
    const {patientID} = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            getPatientProfile(patientID, data, setData, setLoading);
        }, [loading]
    );

    const handleSelect = (e) => {
        if (e == "history") {
            console.log("run history");
        } else if (e == "profile") {
            console.log("run profile");
        }
    }

    return (
        <div className="col-10 p-5">
            <h3 className="mx-4 mt-2 mb-4">Thông tin bệnh nhân</h3>
            <Outlet context={data}></Outlet>
        </div>
    )
}

export default PatientDetail;