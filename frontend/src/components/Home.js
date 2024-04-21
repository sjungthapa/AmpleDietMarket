import React, {Fragment, useEffect} from 'react';
import '../App.css';
import MetaData from './layout/MetaData';

import { useDispatch, useSelector } from 'react-redux'
// import { getProducts } from '../actions/productActions';

const Home = () => {

  const disptach = useDispatch();

  const { loading, products, error, productsCount } = useSelector(state => state.products)
  

  // useEffect(() => {
  //     disptach(getProducts());
  // }, [disptach])
  return (
    <Fragment>
      <MetaData title={'Buy the best grocery'}/>
      <h1 id="products_heading">Latest Products</h1>
      <section id="products" className="container mt-5">
        <div className="row">
          {products && products.map(product => (
            <div key={product._id} className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
              <img
                className="card-img-top mx-auto"
                src="https://static.toiimg.com/photo/105672842.cms"
                alt="Product"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <a href="/">{product.name}</a>
                </h5>
                <div className="ratings mt-auto">
                  <div className="rating-outer">
                    <div className="rating-inner"></div>
                  </div>
                  <span id="no_of_reviews">(5 Reviews)</span>
                </div>
                <p className="card-text">$45.67</p>
                <a href="#" id="view_btn" class="btn btn-block">View Details</a>
              </div>
            </div>
          </div>

            
          ))}
          
        </div>
      </section>
    </Fragment>
  );
}

export default Home;
