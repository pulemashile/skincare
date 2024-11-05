import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Login from './Loginpage';
import RegistrationPage from './Registrationpage';
import Homepage from './Homepage';
import Cart from './Cart';

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Homepage/>} />
          <Route path="/cart" element={<Cart/>} />

          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
