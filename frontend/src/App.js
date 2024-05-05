import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';

//user content
import Home from './components/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import { loadUser } from './actions/userActions';
import store from './store'


//product content
import ProductDetails from './components/product/ProductDetails';


//cart content
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';




//admin content
import Dashboard from './components/admin/Dashboard';
import NewProduct from './components/admin/NewProduct';

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
            <Route path="/me" element={<Profile />} />
            <Route path="/me/update" element={<UpdateProfile />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder/>} />


            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path ="/admin/product" element={<NewProduct />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;