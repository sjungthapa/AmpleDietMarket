import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions'

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.auth);

  const logoutHander = () => {
    dispatch(logout());
    alert.success('logged out successfully')
  }

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <img src="/images/brand1.png" alt="Brand Logo" />
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              className="form-control"
              placeholder="Enter Product Name ..."
            />
            <div className="input-group-append">
              <button id="search_btn" className="btn">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <span id="cart" className="ml-3">Cart</span>
          <span className="ml-1" id="cart_count">2</span>

          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link to="!#" className="btn dropdown-toggle text-white"
                type="button" id="dropDownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                {user && user.name} {/* Display username instead of avatar */}
              </Link>
              <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                <Link className="dropdown-item text-danger" to="/" onClick={logoutHander}>Logout</Link>
              </div>
            </div>
          ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
