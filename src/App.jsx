import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Login from './Loginpage';
import RegistrationPage from './Registrationpage';
import Homepage from './Homepage';

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
