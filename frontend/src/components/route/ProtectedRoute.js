import React, { Fragment } from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      element={
        loading ? (
          <div>Loading...</div>
        ) : isAuthenticated ? (
          isAdmin && user.role !== "admin" ? (
            <Navigate to="/" replace />
          ) : (
            <Component />
          )
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
};

export default ProtectedRoute;
