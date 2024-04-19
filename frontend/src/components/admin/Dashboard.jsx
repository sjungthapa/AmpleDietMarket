import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";

import { getAdminProducts } from "../../actions/productActions";


const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);


  let outOfStock = 0;
  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(allUsers());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="flex">
        <div className="w-64 bg-gray-800 p-6">
          <Sidebar />
        </div>

        <div className="flex-1 p-6">
          <h1 className="my-4 text-3xl font-semibold">Dashboard</h1>

          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title={"Admin Dashboard"} />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-primary text-white p-6 rounded-lg shadow-md">
                  <div className="text-center text-xl font-semibold mb-4">
                    Total Amount
                  </div>
                  <div className="text-center text-2xl font-bold">
                    ${totalAmount && totalAmount.toFixed(2)}
                  </div>
                </div>

                <Link
                  to="/admin/products"
                  className="bg-success text-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center"
                >
                  <div className="text-center text-xl font-semibold mb-4">
                    Products
                  </div>
                  <div className="text-center text-2xl font-bold">
                    {products && products.length}
                  </div>
                  <div className="mt-4">
                    <span className="text-sm">View Details</span>
                    <i className="fa fa-angle-right ml-2"></i>
                  </div>
                </Link>

                <Link
                  to="/admin/orders"
                  className="bg-danger text-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center"
                >
                  <div className="text-center text-xl font-semibold mb-4">
                    Orders
                  </div>
                  <div className="text-center text-2xl font-bold">
                    {orders && orders.length}
                  </div>
                  <div className="mt-4">
                    <span className="text-sm">View Details</span>
                    <i className="fa fa-angle-right ml-2"></i>
                  </div>
                </Link>

                <Link
                  to="/admin/users"
                  className="bg-info text-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center"
                >
                  <div className="text-center text-xl font-semibold mb-4">
                    Users
                  </div>
                  <div className="text-center text-2xl font-bold">
                    {users && users.length}
                  </div>
                  <div className="mt-4">
                    <span className="text-sm">View Details</span>
                    <i className="fa fa-angle-right ml-2"></i>
                  </div>
                </Link>

                <div className="bg-warning text-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
                  <div className="text-center text-xl font-semibold mb-4">
                    Out of Stock
                  </div>
                  <div className="text-center text-2xl font-bold">
                    {outOfStock}
                  </div>
                </div>
              </div>
            </Fragment>
          )}

          <MetaData title={"Admin Dashboard"} />
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
