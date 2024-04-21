import axios from 'axios';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants';

//login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const { data } = await axios.post('http://localhost:4000/api/v1/login', {
                email,
                password
            }, config);
            if (data && data.user) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: data.user
                });
            } else {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: "Invalid response format"
                });
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: error.response.data.message
                });
            } else {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: "An error occurred"
                });
            }
        }
    } catch (error) {
        // Handle any errors that occurred during dispatch or other synchronous operations
        console.error("An error occurred during login:", error);
    }
}

// Register user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_USER_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        // Remove the enclosing object when passing userData
        const { data } = await axios.post('http://localhost:4000/api/v1/register', userData, config);
        
        if (data && data.user) {
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: data.user
            });
        } else {
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: "Invalid response format"
            });
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: error.response.data.message
            });
        } else {
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: "An error occurred"
            });
        }
    }
};


// load user
export const loadUser = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_USER_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        
        const { data } = await axios.get('http://localhost:4000/api/v1/me');
        
        if (data && data.user) {
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: data.user
            });
        } else {
            dispatch({
                type: LOAD_USER_FAIL,
                payload: "Invalid response format"
            });
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: error.response.data.message
            });
        } else {
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: "An error occurred"
            });
        }
    }
};

export const logout = () => async (dispatch) => {
    try {
        

        await axios.get('http://localhost:4000/api/v1/logout');
        
        dispatch({
            type: LOGOUT_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response && error.response.data && error.response.data.message ? error.response.data.message : "An error occurred"
        });
    }
};
//clear errors
export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
