import Nav from "../../components/nav";

function Device() {
    return (
        <div className="d-flex flex-row" style={{backgroundColor: "#F1F8FF"}}>
            <Nav></Nav>
            <div className="col-10">
                <p>Device</p>
            </div>
        </div>
    )
}

export default Device;