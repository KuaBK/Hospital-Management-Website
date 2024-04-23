import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/home";
import SignUp from "./views/login/signUp";
import Patient from "./views/patient/patient";
import PatientDetail from "./views/patient/patientProfile/patientDetail";
import PatientTabs from "./views/patient/patientProfile/patientTabs";
import ListPatient from "./views/patient/listPatient/listPatient";
import Employee from "./views/employee/employee";
import ListEmployee from "./views/employee/listEmployee/listEmployee";
import EmployeeDetail from "./views/employee/employeeProfile/employeeDetail";
import Medicine from "./views/medicine/medicine";
import ListMedicine from "./views/medicine/components/listMedicine";
import Device from "./views/device/device";
import ListDevice from "./views/device/components/listDevice";
import User from "./views/user"
import SignIn from "./views/login/signIn";


function Navigation() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/user" Component={User}></Route>
          <Route path="/user/signup" Component={SignUp}></Route>
          <Route path="/user/signin" Component={SignIn}></Route>
          <Route path="/" Component={Home}></Route>
          <Route path="/patient" Component={Patient}>
            <Route path="" Component={ListPatient}></Route>
            <Route path=":patientID" Component={PatientDetail}>
              <Route path="" Component={PatientTabs}></Route>
            </Route>
          </Route>
          <Route path="/employee" Component={Employee}>
            <Route path="" Component={ListEmployee}></Route>
            <Route path=":employeeID" Component={EmployeeDetail}></Route>
          </Route>
          <Route path="/medicine" Component={Medicine}>
            <Route path="" Component={ListMedicine}></Route>
          </Route>
          <Route path="/device" Component={Device}>
            <Route path="" Component={ListDevice}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode  >
    <Navigation />
  </React.StrictMode>
)