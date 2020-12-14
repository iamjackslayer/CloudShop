import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { getUserProfile } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const UserEditScreen = ({ match }) => {
  const userProfile = useSelector(state => state.userProfile)
  const [name, setName] = useState(userProfile.details.name)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(userProfile.details.isAdmin)
  const [email, setEmail] = useState(userProfile.details.email)

  const dispatch = useDispatch()

  useEffect(() => {
    if (userProfile.details._id !== match.params.id) {
      dispatch(getUserProfile(match.params.id))
    }
    setName(userProfile.details.name)
    setEmail(userProfile.details.email)
    setIsAdmin(userProfile.details.isAdmin)
  }, [dispatch, match, userProfile])

  const submitHandler = e => {
    e.preventDefault()
    console.log('submit')
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go back
      </Link>
      <h1>Edit User</h1>
      {userProfile.loading ? (
        <Loader />
      ) : userProfile.error ? (
        <Message variant='danger'>{userProfile.error}</Message>
      ) : (
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
                inline
                label='Set as admin'
              />
            </Form.Group>
            <Button type='submit' variant='primary'>
              update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  )
}

export default UserEditScreen
