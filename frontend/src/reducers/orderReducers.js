import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE
} from '../constants/orderConstants.js'

const initialOrderState = {
  loading: false,
  error: null,
  order: {},
  success: false
}

export const orderCreateReducer = (state = initialOrderState, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        success: true
      }
    case ORDER_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      }
    default:
      return state
  }
}
