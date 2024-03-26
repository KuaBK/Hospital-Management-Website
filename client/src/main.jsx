import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Patient from "./views/patient";
import Home from "./views/home";
import Employee from "./views/employee";
import Medicine from "./views/medicine";
import Device from "./views/device";

function Navigation() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" Component={Home}></Route>
              <Route path="/patient" Component={Patient}></Route>
              <Route path="/employee" Component={Employee}></Route>
              <Route path="/medicine" Component={Medicine}></Route>
              <Route path="/device" Component={Device}></Route>
          </Routes>
      </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Navigation />
  // </React.StrictMode>
)