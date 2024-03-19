import Nav from "../../components/nav";

function Patient() {
    return (
        <div className="d-flex flex-row" style={{backgroundColor: "#F1F8FF"}}>
            <Nav></Nav>
            <div className="col-10">
                <p>Patient</p>
            </div>
        </div>
    )
}

export default Patient;