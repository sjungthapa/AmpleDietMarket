import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginSignup from './components/LoginSignup/LoginSignup.jsx';
import Home from './components/Home/home.jsx';
import NewProduct from './components/admin/NewProduct.jsx';



// Define routes
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LoginSignup />} />
      <Route path="/newProduct" element={<NewProduct />} />
    </Routes>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
