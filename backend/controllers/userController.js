import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  const isAuth = user ? await user.matchPassword(password) : false

  if (user && isAuth) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null
    })
  } else {
    res.status(401) // Unauthorized
    throw new Error('Invalid email or password')
    res.json({ email, password })
  }
})

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found') // our errorHandler will be called with arguments err, req, res, next
  }
})
