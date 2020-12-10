import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'
import _ from 'lodash'

// @desc Create new order
// @route /api/orders
// @access Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body
  if (_.isEmpty(orderItems)) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice
    })
    const createdOrder = order.save()
    res.status(201).json(createdOrder)
  }
})
