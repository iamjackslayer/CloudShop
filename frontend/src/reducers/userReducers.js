import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_UPDATE_PROFILE_FAILURE,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_RESET
} from '../constants/userConstants'

const userLoginInitialState = {
  userInfo: {},
  loading: false,
  error: null
}

export const userLoginReducer = (state = userLoginInitialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        error: null
      }
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: {}
      }
    case USER_LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

const userRegisterInitialState = {
  userInfo: {},
  loading: false,
  error: null
}

export const userRegisterReducer = (
  state = userRegisterInitialState,
  action
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload
      }
    case USER_REGISTER_FAILURE:
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

const initialUserProfileState = {
  details: {},
  loading: false,
  error: null
}
export const userProfileReducer = (state = initialUserProfileState, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case USER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        details: action.payload
      }
    default:
      return state
  }
}

const initialUserUpdateProfileState = {
  userInfo: {},
  loading: false,
  success: false,
  error: null
}

export const userUpdateProfileReducer = (
  state = initialUserUpdateProfileState,
  action
) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.payload
      }
    case USER_UPDATE_PROFILE_RESET:
      return initialUserProfileState
    case USER_UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload
      }
    default:
      return state
  }
}
