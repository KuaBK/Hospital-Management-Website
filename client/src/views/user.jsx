import Nav from "../hooks/nav";

function User() {
    return (
        <div className="d-flex flex-row" style={{backgroundColor: "#F1F8FF"}}>
            <Nav></Nav>
            <div className="" style={{width: "80%"}}>
                <p>User</p>
            </div>
        </div>
    )
}

export default User;