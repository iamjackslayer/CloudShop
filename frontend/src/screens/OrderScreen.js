import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, Image, Card, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  payOrder,
  deliverOrder
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET
} from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const orderDetails = useSelector(state => state.orderDetails)
  const { loading, error, order } = orderDetails
  const orderPay = useSelector(state => state.orderPay)
  const orderDeliver = useSelector(state => state.orderDeliver)
  // we're gonna have a piece of state for when the sdk is ready
  const [sdkReady, setSdkReady] = useState(false)

  useEffect(() => {
    if (_.isEmpty(userLogin.userInfo)) {
      history.push('/')
    }
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    if (!order._id || order._id !== match.params.id) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(match.params.id))
    }
    if (!order.isPaid && !window.paypal) {
      addPaypalScript()
    }
    // dispatch getOrderDetails again upon successful payment
    orderPay.success &&
      !order.isPaid &&
      dispatch(getOrderDetails(match.params.id))
  }, [dispatch, match, order, orderPay, loading, history, userLogin.userInfo])

  const deliverHandler = id => {
    dispatch(deliverOrder(id))
  }

  const successPaymentHandler = (details, data) => {
    dispatch(payOrder(order._id, details))
  }

  if (loading || !order._id) {
    return <Loader />
  } else if (error) {
    return <Message variant='danger'>{error}</Message>
  }
  return (
    <>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items:</h2>
              {_.isEmpty(order.orderItems) ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup>
                  {order.orderItems.map((itm, idx) => (
                    <ListGroup.Item key={idx}>
                      <Row>
                        <Col md={1}>
                          <Image src={itm.image} alt={itm.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/api/products/${idx}`}>{itm.name}</Link>
                        </Col>
                        <Col md={4}>
                          {itm.qty} x ${itm.price} = {itm.qty * itm.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {orderPay.loading || !sdkReady ? (
                    <Loader />
                  ) : order.user._id.toString() !== userLogin.userInfo._id ? (
                    <Message variant='secondary'>
                      This order is made by someone else
                    </Message>
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {orderDeliver.loading && <Loader />}
              {userLogin.userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={e => deliverHandler(order._id)}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
