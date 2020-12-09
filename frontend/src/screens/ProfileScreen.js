import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import _ from 'lodash'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserProfile, updateUserProfile } from '../actions/userActions'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)

  const { loading, error, details } = useSelector(state => state.userProfile)

  const { success } = useSelector(state => state.userUpdateProfile)

  useEffect(() => {
    if (_.isEmpty(userLogin.userInfo)) {
      history.push('/login')
    } else {
      if (!details.name) {
        dispatch(getUserProfile('profile'))
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
          name: details.name,
          email: details.email,
          password: details.password
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
      <Col md={9}></Col>
    </Row>
  )
}

export default ProfileScreen
