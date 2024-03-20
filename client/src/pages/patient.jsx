import { Component } from "react"
import Nav from "../components/nav";
import axios from "axios"

class Patient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        };
    }

    componentDidMount() {
        axios.get("http://localhost:3000/patient").then(result => {
            this.setState({name: result.data.name})
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="d-flex flex-row" style={{backgroundColor: "#F1F8FF"}}>
                <Nav></Nav>
                <div className="col-10">
                    <p>Patient</p>
                    <p>{this.state.name}</p>
                </div>
            </div>
        )
    }
}

export default Patient;