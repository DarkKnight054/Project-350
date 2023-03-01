import React from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './scenes/dashboard';
import Team from './scenes/team/index';
import Contacts from './scenes/contacts/index';
import CreateForm from './scenes/form/index';
import UpdateForm from './scenes/form/index2';
import Home from './scenes/home/index.jsx';
import Login from './scenes/login/index.jsx';
import Registration from './scenes/registration/index.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/team" element={<Team />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/createcriminal" element={<CreateForm />} />
      <Route path="/updatecriminal" element={<UpdateForm />} />
    </Routes>
  );
}

export default App;
