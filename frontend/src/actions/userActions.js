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
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAILURE
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
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
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
