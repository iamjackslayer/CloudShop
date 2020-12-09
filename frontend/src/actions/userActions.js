import axios from 'axios'
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE
} from '../constants/userConstants'

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: res.data
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data
    })
    localStorage.setItem('userInfo', JSON.stringify(res.data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )
    localStorage.setItem('userInfo', JSON.stringify(res.data))

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message
    })
  }
}

export const logout = () => async dispatch => {
  localStorage.removeItem('userInfo')
  dispatch({
    type: USER_LOGOUT_SUCCESS
  })
}
