import Nav from "../hooks/nav";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Home() {
  const navigate = useNavigate();
  const tokenUser = Cookies.get("tokenUser");

  useEffect(() => {
      if (!tokenUser) {
        return navigate("/user/signin");
      }
    }
  )

  return (
    <div className="d-flex flex-row" style={{backgroundColor: "#F1F8FF"}}>
      <Nav></Nav>
      <div className="col-10">
        <p>Home</p>
      </div>
    </div>
  );
}

export default Home;