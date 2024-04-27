import React, {Fragment, useEffect} from 'react';
import '../App.css';
import MetaData from './layout/MetaData';
import Product from './product/Product'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions';

const Home = () => {

  const disptach = useDispatch();

  const { loading, products, error, productsCount } = useSelector(state => state.products)
  

  useEffect(() => {
      disptach(getProducts());
  }, [disptach])
  return (
    <Fragment>
      <MetaData title={'Buy the best grocery'}/>
      <h1 id="products_heading">Latest Products</h1>
      <section id="products" className="container mt-5">
        <div className="row">
          {products && products.map(product => (
              <Product key={product._id} product={product} />
          ))}
          
        </div>
      </section>
    </Fragment>
  );
}

export default Home;
