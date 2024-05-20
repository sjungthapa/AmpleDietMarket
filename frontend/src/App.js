import { useEffect, Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";

import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import orderSuccess from "./components/cart/orderSuccess";

// Cart Imports
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

// Auth or user imports
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

// Admin Imports
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";

import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import store from "./store";
import axios from "axios";

// Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    try {
      store.dispatch(loadUser());
    } catch (error) {
      console.log(error);
    }
    async function getStripeApiKey() {
      try {
        const { data } = await axios.get("/api/v1/stripeapi");
        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        console.log(error);
      }
    }

    getStripeApiKey();
  }, []);

  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Router>
      <Fragment>
        <div className="App">
          <Header />
          <div className="container container-fluid">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/product/:id" component={ProductDetails} />

              <Route exact path="/cart" component={Cart} />
              <ProtectedRoute exact path="/shipping" component={Shipping} />
              <ProtectedRoute
                exact
                path="/order/confirm"
                component={ConfirmOrder}
              />
              <ProtectedRoute exact path="/success" component={orderSuccess} />
              <Route path="/register" component={Register} />
              <Route exact path="/password/forgot" component={ForgotPassword} />
              <Route
                exact
                path="/password/reset/:token"
                component={NewPassword}
              />

              <ProtectedRoute
                exact
                path="/password/update"
                component={UpdatePassword}
              />

              <ProtectedRoute exact path="/dashboard" isAdmin={true} component={Dashboard} />
              <ProtectedRoute exact path="/admin/products" isAdmin={true} component={ProductList} />
              <ProtectedRoute exact path="/admin/product" isAdmin={true} component={NewProduct} />
              <ProtectedRoute exact path="/admin/product/:id" isAdmin={true} component={UpdateProduct} />
              <ProtectedRoute exact path="/admin/orders" isAdmin={true} component={OrdersList} />
              <ProtectedRoute exact path="/admin/order/:id" isAdmin={true} component={ProcessOrder} />
              <ProtectedRoute exact path="/admin/users" isAdmin={true} component={UsersList} />
              <ProtectedRoute exact path="/admin/user/:id" isAdmin={true} component={UpdateUser} />
              <ProtectedRoute exact path="/admin/reviews" isAdmin={true} component={ProductReviews} />

              <ProtectedRoute exact path="/me" component={Profile} />
              <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
              <ProtectedRoute exact path="/orders/me" component={ListOrders} />
              <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          )}
          {!loading && user && user.role !== "admin" && <Footer />}
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
