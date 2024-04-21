import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { loadUser } from './actions/userActions';
import store from './store'

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

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
