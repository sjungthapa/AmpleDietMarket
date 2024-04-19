import React, { useEffect } from 'react';

import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Header from './Header/Header';
import Navbar from './Navbar/Navbar';



const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])


    return (
        <div>
            
            <Header />
            <Navbar />
        </div>
    )
}

export default Home;