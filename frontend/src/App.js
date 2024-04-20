import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
