import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST
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
        loading: true,
        products: []
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
