import axios from 'axios';

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants';

export const getProducts = () => async (dispatch) => {
    try {

        dispatch({type: ALL_PRODUCTS_REQUEST})

        const { data } = await axios.get('/api/v1/products')
        
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const { data } = await axios.get(`/api/v1/product/${id}`)
        
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
  
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        `/api/v1/admin/product/new`,
        productData,
        config
      );
  
      console.log("Response data:", data);
  
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  

//clear errors
export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}