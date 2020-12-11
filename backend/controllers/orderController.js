import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'
import _ from 'lodash'

// @desc Create new order
// @route POST /api/orders
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
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (_.isEmpty(order)) {
    res.status(404)
    throw new Error('Order not found') // our errorHandler will be called
  }
  if (
    order.user._id.toString() !== req.user._id.toString() &&
    !req.user.isAdmin
  ) {
    res.status(401)
    throw new Error('Unauthorized')
  }
  res.status(200).json(order)
})

// @desc Update order to paid
// @route PATCH /api/orders/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (_.isEmpty(order)) {
    res.status(404)
    throw new Error('Order not found') // our errorHandler will be called
  }
  if (order.user._id.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error('Unauthorized')
  }
  order.isPaid = true
  order.paidAt = Date.now()
  order.paymentResult = {
    // comes from PayPal in req.body
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address
  }
  const updatedOrder = await order.save()
  res.status(200).json(updatedOrder)
})