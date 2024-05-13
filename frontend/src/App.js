import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; // Import Route
import Header from './components/layout/Header';

import ProtectedRoute from "./components/route/ProtectedRoute";

//user content
import Home from './components/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import { loadUser } from './actions/userActions';
import store from './store';


//product content
import ProductDetails from './components/product/ProductDetails';


//cart content
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';


//admin content
import Dashboard from './components/admin/Dashboard';
import NewProduct from './components/admin/NewProduct';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

            {/* User Routes */}
            <ProtectedRoute path="/me" component={Profile} />
            <ProtectedRoute path="/me/update" component={UpdateProfile} />

            {/* Cart Routes */}
            <ProtectedRoute path="/cart" component={Cart} />
            <ProtectedRoute path="/shipping" component={Shipping} />
            <ProtectedRoute path="/order/confirm" component={ConfirmOrder} />

            {/* Product Routes */}
            <Route path="/product/:id" component={ProductDetails} />

            {/* Admin Routes */}
            <ProtectedRoute path="/dashboard" isAdmin component={Dashboard} />
            <ProtectedRoute path="/admin/product" isAdmin component={NewProduct} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
