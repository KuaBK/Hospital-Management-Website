import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Patient from "./pages/patient";
import Home from "./pages/home";
import Employee from "./pages/employee";
import Medicine from "./pages/medicine";
import Device from "./pages/device";

function Root() {
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
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)