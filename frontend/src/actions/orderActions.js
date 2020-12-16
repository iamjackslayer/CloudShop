import axios from 'axios'
import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAILURE,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  MY_ORDER_LIST_FAILURE,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  ORDER_LIST_FAILURE,
  ORDER_LIST_REQUEST,
  ORDER_LIST_RESET,
  ORDER_LIST_SUCCESS,
  ORDER_DELIVER_FAILURE,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS
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

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`
      }
    }
    const res = await axios.patch(
      `/api/orders/${id}/pay`,
      paymentResult,
      config
    )
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAILURE,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_ORDER_LIST_REQUEST
    })
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`
      }
    }
    const res = await axios.get('/api/orders/myorders', config)

    dispatch({
      type: MY_ORDER_LIST_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: MY_ORDER_LIST_FAILURE,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST
    })
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`
      }
    }
    const res = await axios.get(`/api/orders`, config)
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAILURE,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const deliverOrder = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST
    })
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`
      }
    }
    const res = await axios.patch(`/api/orders/${id}/deliver`, {}, config)
    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAILURE,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
