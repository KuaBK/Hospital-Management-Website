import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/home";
import SignUp from "./views/login/signUp";
import Patient from "./views/patient/patient";
import PatientDetail from "./views/patient/components/patientDetail";
import Profile from "./views/patient/components/profile";
import ListPatient from "./views/patient/components/listPatient";
import UpdateProfile from "./views/patient/components/updateProfile";
import Employee from "./views/employee";
import Medicine from "./views/medicine";
import Device from "./views/device";
import SignIn from "./views/login/signIn";


function Navigation() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/user/signup" Component={SignUp}></Route>
          <Route path="/user/signin" Component={SignIn}></Route>
          <Route path="/" Component={Home}></Route>
          <Route path="/patient" Component={Patient}>
            <Route path="" Component={ListPatient}></Route>
            <Route path=":patientID" Component={PatientDetail}>
              <Route path="" Component={Profile}></Route>
              <Route path="update" Component={UpdateProfile}></Route>
            </Route>
          </Route>
          <Route path="/employee" Component={Employee}></Route>
          <Route path="/medicine" Component={Medicine}></Route>
          <Route path="/device" Component={Device}></Route>
        </Routes>
      </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode  >
    <Navigation />
  </React.StrictMode>
)