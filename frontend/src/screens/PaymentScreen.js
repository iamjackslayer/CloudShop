import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col } from 'react-bootstrap'
import _ from 'lodash'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
  const { shippingAddress } = useSelector(state => state.cart)

  const [paymentMethod, setPaymentMethod] = useState('Paypal')

  useEffect(() => {
    if (_.isEmpty(shippingAddress)) {
      history.push('/shipping')
    }
  })

  const dispatch = useDispatch()

  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Shippign</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='paymentMethod'>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Paypal or Credit Card'
              id='Paypal'
              name='paymentMethod'
              value='Paypal'
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Save
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
