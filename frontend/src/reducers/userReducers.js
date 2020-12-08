import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_FAILURE
} from '../constants/userConstants'

const userInitialState = {
  userInfo: {},
  loading: false,
  error: null
}

export const userLoginReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
        ...state
      }
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        error: null
      }
    case USER_LOGIN_FAILURE:
      return {
        loading: false,
        error: action.payload,
        ...state
      }
    case USER_LOGOUT_REQUEST:
      return {
        loading: true,
        ...state
      }
    case USER_LOGOUT_SUCCESS:
      return {
        loading: false,
        userInfo: {},
        ...state
      }
    case USER_LOGOUT_FAILURE:
      return {
        loading: false,
        error: action.payload,
        ...state
      }
    default:
      return state
  }
}
