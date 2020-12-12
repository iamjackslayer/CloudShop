import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import _ from 'lodash'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserProfile, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { Link } from 'react-router-dom'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)

  const { loading, error, details } = useSelector(state => state.userProfile)

  const myOrderList = useSelector(state => state.myOrderList)

  const { success } = useSelector(state => state.userUpdateProfile)

  useEffect(() => {
    if (_.isEmpty(userLogin.userInfo)) {
      history.push('/login')
    } else {
      if (!details.name) {
        dispatch(getUserProfile('profile'))
        dispatch(listMyOrders())
      } else {
        setName(details.name)
        setEmail(details.email)
      }
    }
  }, [history, userLogin, dispatch, details])

  const submitHandler = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateUserProfile({
          name,
          email,
          password
        })
      )
    }
  }
  return (
    <Row>
      <Col md={3}>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && (
          <Message variant='success'>Profile successfully updated</Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your name'
              value={name}
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm your password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Update profile
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Orders</h2>
        {myOrderList.loading ? (
          <Loader />
        ) : myOrderList.error ? (
          <Message variant='danger'>{myOrderList.error}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myOrderList.orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td> {order.created_at}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <Button variant='light'>Details</Button>
                    </Link>{' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
