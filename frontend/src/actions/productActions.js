import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAILURE,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS
} from '../constants/productConstants'

export const listProducts = () => async dispatch => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST
    })
    const { data } = await axios.get('/api/products')
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILURE,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message
    })
  }
}

export const getProductDetails = id => async dispatch => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST
    })
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILURE,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message
    })
  }
}

export const deleteProduct = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST
    })
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`
      }
    }
    const res = await axios.delete(`/api/products/${id}`, config)
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: res.data.message
    })
    dispatch(listProducts())
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAILURE,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST
    })
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`
      }
    }
    const res = await axios.post(`/api/products`, {}, config)
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAILURE,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const updateProduct = product => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST
    })
    const {
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock
    } = product
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`
      }
    }

    const res = await axios.put(
      `/api/products/${product._id}`,
      {
        name,
        image,
        brand,
        category,
        description,
        price,
        countInStock
      },
      config
    )
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAILURE,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const createProductReview = (productId, { rating, comment }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST
    })
    const config = {
      headers: {
        Authorization: `Bearer ${getState.userLogin.userInfo.token}`
      }
    }
    const res = await axios.post(
      `/api/products/${productId}/reviews`,
      { rating, comment },
      config
    )
    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAILURE,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
