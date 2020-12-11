import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS
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

const initialOrderDetailsState = {
  loading: false,
  error: null,
  order: {
    orderItems: [],
    shippingAddress: {}
  },
  success: false
}

export const orderDetailsReducer = (
  state = initialOrderDetailsState,
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
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
        success: false,
        error: action.payload
      }
    default:
      return state
  }
}
