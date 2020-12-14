import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE
} from '../constants/productConstants'
const productListInitialState = {
  products: [],
  loading: false,
  error: null
}

export const productListReducer = (state = productListInitialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload
      }
    case PRODUCT_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

const productDetailsInitialState = {
  loading: true,
  product: {
    reviews: []
  },
  error: null
}

export const productDetailsReducer = (
  state = productDetailsInitialState,
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload
      }
    case PRODUCT_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

const productDeleteInitialState = {
  loading: false,
  error: null,
  success: false
}

export const productDeleteReducer = (
  state = productDeleteInitialState,
  action
) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        error: false,
        success: true
      }
    case PRODUCT_DELETE_FAILURE:
      return {
        loading: false,
        error: action.payload,
        success: false
      }
    default:
      return state
  }
}
