import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";
import OAuth from "../OAuth"

const Login = ({ location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({});

  const history = useHistory();

  const alert = useAlert();

  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    const errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
    } else {
      setValidationError({});
      dispatch(login(email, password));
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />

          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className={`form-control ${validationError.email ? 'is-invalid' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {validationError.email && <div className="invalid-feedback">{validationError.email}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className={`form-control ${validationError.password ? 'is-invalid' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {validationError.password && <div className="invalid-feedback">{validationError.password}</div>}
                </div>

                <Link to="/password/forgot" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <Link to="/register" className="float-right mt-3">
                  New User?
                </Link>
                <OAuth />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
