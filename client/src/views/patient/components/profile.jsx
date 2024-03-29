import { useOutletContext } from "react-router-dom";

import PatientDetailTabs from "./tabs";

function Profile() {
    const data = useOutletContext();

    return (
        <PatientDetailTabs data={data}></PatientDetailTabs>
    )
}

export default Profile;