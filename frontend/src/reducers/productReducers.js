import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAILURE,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS
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

const productCreateInitialState = {
  loading: false,
  error: null,
  product: {},
  success: false
}

export const productCreateReducer = (
  state = productCreateInitialState,
  action
) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        success: true
      }
    case PRODUCT_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      }
    case PRODUCT_CREATE_RESET:
      return productCreateInitialState
    default:
      return state
  }
}

const productUpdateInitialState = {
  loading: false,
  error: null,
  product: {},
  success: false
}

export const productUpdateReducer = (
  state = productUpdateInitialState,
  action
) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: false
      }
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        success: true
      }
    case PRODUCT_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false
      }
    case PRODUCT_UPDATE_RESET:
      return productUpdateInitialState
    default:
      return state
  }
}

const productCreateReviewInitialState = {
  loading: false,
  error: null,
  success: false
}

export const productCreateReviewReducer = (
  state = productCreateReviewInitialState,
  action
) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        error: null,
        loading: false,
        success: true
      }
    case PRODUCT_CREATE_REVIEW_FAILURE:
      return {
        loading: false,
        error: action.payload,
        success: false
      }
    case PRODUCT_CREATE_REVIEW_RESET:
      return productCreateReviewInitialState
    default:
      return state
  }
}
