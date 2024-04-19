import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
