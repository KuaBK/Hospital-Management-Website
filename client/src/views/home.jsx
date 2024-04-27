import Nav from "../hooks/nav";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import moment from 'moment';
moment().format();

function Home() {
  const navigate = useNavigate();
  const tokenUser = Cookies.get("tokenUser");

  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const fetchApi = async (setLoading) => {
    setLoading(true);

    await axios.get("http://localhost:3000/patients", {
    }).then(result => setPatients(result.data));

    await axios.get("http://localhost:3000/medicines", {
    }).then(result => setMedicines(result.data));

    setLoading(false);
  };

  useEffect(() => {
      if (!tokenUser) {
        return navigate("/user/signin");
      }
      fetchApi(setLoading);
    }, []
  )

  return (
    <div className="d-flex flex-row" style={{backgroundColor: "#F1F8FF"}}>
      <Nav></Nav>
      <div className="p-5" style={{width: "80%"}}>
        <h3 className="mx-4 mt-2 mb-4">Trang chủ</h3>
        <div className="card border border-0 d-flex flex-row">
            <div style={{width: "60%"}}>
              <div className="d-flex flex-row justify-content-between align-items-center mb-3 border-bottom p-3">
                  <h5 className="mx-2 mb-0">Bệnh nhân đang điều trị</h5>
              </div>
              <div className="px-3" style={{maxHeight: "390px", overflowY: "scroll"}}>
                  <table className="table align-middle">
                      <thead style={{position: "sticky", top: "0px"}}>
                          <tr>
                            <th scope="col">Họ tên</th>
                            <th scope="col">Tuổi</th>
                            <th scope="col">Giới tính</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Số điện thoại</th>
                          </tr>
                      </thead>
                      <tbody>
                        {patients.map((patient) => {
                          return (
                              <tr key={patient._id} >
                                  <td>{patient.name}</td>
                                  <td>{patient.age}</td>
                                  <td>{patient.gender}</td>
                                  <td>{patient.address}</td>
                                  <td>{patient.phone_number}</td>
                              </tr>
                          )
                        })}
                      </tbody>
                  </table>
              </div>
            </div>
            <div style={{width: "40%"}}>
              <div className="d-flex flex-row justify-content-between align-items-center mb-3 border-bottom p-3">
                  <h5 className="mx-2 mb-0">Thuốc sắp hết hạn và hết hạn</h5>
              </div>
              <div className="px-3" style={{maxHeight: "390px", overflowY: "scroll"}}>
                  <table className="table align-middle">
                      <thead style={{position: "sticky", top: "0px"}}>
                          <tr>
                            <th scope="col">Tên thuốc</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Hạn sử dụng</th>
                          </tr>
                      </thead>
                      <tbody>
                        {medicines.map((medicine) => {
                            const dataArray = medicine.data;
                            return (
                                dataArray.map((data) => {
                                  if (moment(data.expire).subtract(1, "M") <= moment()) {
                                    return (
                                        <tr className="align-middle" key={data.expire}>
                                            <td>{medicine.name}</td>
                                            <td>{data.quantity}</td>
                                            <td>{moment(data.expire).format("DD-MM-YYYY")}</td>
                                        </tr>
                                    )
                                  }
                                })
                            )
                        })}
                      </tbody>
                  </table>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;