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
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_FAILURE,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_RESET,
  USER_DELETE_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS
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
    case USER_DETAILS_RESET:
      return initialUserProfileState
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

const initialUserListState = {
  users: [],
  loading: false,
  error: null
}

export const userListReducer = (state = initialUserListState, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        loading: true
      }
    case USER_LIST_SUCCESS:
      return {
        users: action.payload,
        loading: false,
        error: null
      }
    case USER_LIST_FAILURE:
      return {
        error: action.payload,
        loading: false
      }
    case USER_LIST_RESET:
      return initialUserListState
    default:
      return state
  }
}

const initialUserDeleteState = {
  loading: false
}

export const userDeleteReducer = (state = initialUserDeleteState, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true
      }
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        message: action.payload,
        success: true
      }
    case USER_DELETE_FAILURE:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}
