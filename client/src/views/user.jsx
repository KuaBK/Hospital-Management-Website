import Nav from "../hooks/nav";

function User() {
    return (
        <div className="d-flex flex-row" style={{backgroundColor: "#F1F8FF"}}>
            <Nav></Nav>
            <div className="p-5" style={{width: "80%", height: "100vh"}}>
                {/* <h3 className="mx-4 mt-2 mb-4">Thông tin cá nhân</h3> */}
                <div className="card border border-0">
                    <div className="d-flex flex-row justify-content-between align-items-center mb-3 border-bottom p-3">
                        <h5 className="mx-2 mb-0">Thông tin cá nhân</h5>
                    </div>
                    
                    {/* <div className="px-3" style={{maxHeight: "390px", overflowY: "scroll"}}>
                        
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default User;