import React, { Fragment } from "react";
import { Route, useHistory } from "react-router-dom"; // Import useHistory
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const history = useHistory(); // Use useHistory
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      element={
        loading ? (
          <div>Loading...</div>
        ) : isAuthenticated ? (
          isAdmin && user.role !== "admin" ? (
            history.replace("/") // Use history.replace
          ) : (
            <Component />
          )
        ) : (
          history.replace("/login") // Use history.replace
        )
      }
    />
  );
};

export default ProtectedRoute;
