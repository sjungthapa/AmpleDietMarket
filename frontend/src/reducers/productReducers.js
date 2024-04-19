import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants';

export const productsReducer = (state = { products: [] }, action) => { // Correct the arrow function syntax
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                ...state, // Spread the existing state
                loading: true,
                products: []
            };

        case ALL_PRODUCTS_SUCCESS:
            return {
                ...state, // Spread the existing state
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
            };

        case ALL_PRODUCTS_FAIL:
            return {
                ...state, // Spread the existing state
                loading: false,
                error: action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state, // Spread the existing state
                error: null
            };

        default:
            return state;
    }
};

export default productsReducer;
