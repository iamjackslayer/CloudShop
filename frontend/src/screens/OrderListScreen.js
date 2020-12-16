import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getAllOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { orders, loading, error, success } = useSelector(
    state => state.orderList
  )
  const { userInfo } = useSelector(state => state.userLogin)
  useEffect(() => {
    ;(_.isEmpty(userInfo) || !userInfo.isAdmin) && history.push('/')

    dispatch(getAllOrders())
  }, [userInfo, history, dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>USER</th>
              <th>CREATED AT</th>
              <th>SHIPPING ADDRESS</th>
              <th>PAYMENT RESULT</th>
              <th>TAX PRICE</th>
              <th>SHIPPING PRICE</th>
              <th>TOTAL PRICE</th>
              <th>IS PAID</th>
              <th>PAID AT</th>
              <th>IS DELIVERED</th>
              <th>DELIVERED AT</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </td>
                <td></td>
                <td>${order.taxPrice}</td>
                <td>${order.shippingPrice}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>{order.isPaid ? order.paidAt : 'Not paid'}</td>
                <td>
                  {order.isDelivered ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? order.deliveredAt : 'Not delivered'}
                </td>
                <td>
                  <Link to={`/order/${order._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
