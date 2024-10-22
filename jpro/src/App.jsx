import React from "react";
import Login from "./Login/Login.jsx";
import Home from "./Home/Home.jsx";
import Register from "./Register/Register.jsx";
import Reset from "./Reset/Reset.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Reset" element={<Reset />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
