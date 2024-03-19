import Nav from "../../components/nav";

function Home() {
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