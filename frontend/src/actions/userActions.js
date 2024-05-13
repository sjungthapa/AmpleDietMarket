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
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
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
            const { data } = await axios.post('/api/v1/login', {
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

        const { data } = await axios.post('/api/v1/register', userData, config);
        
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

        
        const { data } = await axios.get('/api/v1/me');
        
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
        

        await axios.get('/api/v1/logout');
        
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

// Update user
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PROFILE_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        
        const { data } = await axios.put('/api/v1/me/update', userData, config);
        
        if (data && data.user) {
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: data.success
            });
        } else {
            dispatch({
                type: UPDATE_PROFILE_FAIL,
                payload: "Invalid response format"
            });
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            dispatch({
                type: UPDATE_PROFILE_FAIL,
                payload: error.response.data.message
            });
        } else {
            dispatch({
                type: UPDATE_PROFILE_FAIL,
                payload: "An error occurred"
            });
        }
    }
};

// Update password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.put(
        "/api/v1/password/update",
        passwords,
        config
      );
  
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Forgot password
  export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post("/api/v1/password/forgot", email, config);
  
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Reset password
  export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PASSWORD_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.put(
        `/api/v1/password/reset/${token}`,
        passwords,
        config
      );
  
      dispatch({
        type: NEW_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_PASSWORD_FAIL,
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
