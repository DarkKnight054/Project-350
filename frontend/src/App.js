import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team/index";
import Contacts from "./scenes/contacts/index";
import Form from "./scenes/form/index";
import Home from "./scenes/home/index.jsx";
import Login from "./scenes/login/index.jsx";

function App() {
  
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/team" element={<Team />} />
      <Route path="/contacts" element = {<Contacts />} />
      <Route path="/form" element={<Form />} />
    </Routes>
  );
}

export default App;
