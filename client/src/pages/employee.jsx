import Nav from "../components/nav";

function Employee() {
    return (
        <div className="d-flex flex-row" style={{backgroundColor: "#F1F8FF"}}>
            <Nav></Nav>
            <div className="col-10">
                <p>Employee</p>
            </div>
        </div>
    )
}

export default Employee;