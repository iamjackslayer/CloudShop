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
  USER_REGISTER_FAILURE,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAILURE,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAILURE,
  USER_LIST_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_RESET,
  USER_DELETE_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS
} from '../constants/userConstants'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import { MY_ORDER_LIST_RESET } from '../constants/orderConstants'

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
      payload: {
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        isAdmin: res.data.isAdmin,
        token: res.data.token
      }
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        isAdmin: res.data.isAdmin,
        token: res.data.token
      }
    })
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        isAdmin: res.data.isAdmin,
        token: res.data.token
      })
    )
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
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const logout = () => async dispatch => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  dispatch({
    type: USER_LOGOUT_SUCCESS
  })
  dispatch({
    type: USER_DETAILS_RESET
  })
  dispatch({
    type: MY_ORDER_LIST_RESET
  })
  dispatch({
    type: USER_LIST_RESET
  })
  dispatch({
    type: USER_UPDATE_RESET
  })
  dispatch({
    type: PRODUCT_CREATE_RESET
  })
}

export const getUserProfile = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    })
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const res = await axios.get(`/api/users/${id}`, config)
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILURE,
      error:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const updateUserProfile = toUpdate => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    })
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { name, email, password } = toUpdate
    const res = await axios.put(
      `/api/users/profile`,
      { name, email, password },
      config
    )
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: res.data
    })
    // Update the userLogin state (Header depends on it)
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data
    })
    // Update the userProfile state (Initial autopopulation of ProfileScreen depends onit)
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: res.data
    })
    localStorage.setItem('userInfo', JSON.stringify(res.data))
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAILURE,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST
    })
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`
      }
    }
    const res = await axios.get(`/api/users`, config)
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAILURE,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const deleteUser = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST
    })
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`
      }
    }
    const res = await axios.delete(`/api/users/${id}`, config)
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: res.data.message
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAILURE,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const updateUser = toUpdate => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`
      }
    }
    const { _id, name, email, password, isAdmin } = toUpdate
    const res = await axios.put(
      `/api/users/${toUpdate._id}`,
      { _id, name, email, password, isAdmin },
      config
    )
    dispatch({
      type: USER_UPDATE_SUCCESS
    })
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAILURE,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
