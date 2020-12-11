import axios from 'axios'
import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS
} from '../constants/orderConstants'

export const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
    })
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice
    } = order

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`
      }
    }

    const res = await axios.post(
      '/api/orders',
      {
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice
      },
      config
    )

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAILURE,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getOrderDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST
    })
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`
      }
    }
    const { data } = await axios.get(`/api/orders/${id}`, config)
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
