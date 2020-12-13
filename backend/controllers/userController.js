import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import _ from 'lodash'

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
      token: generateToken(user._id)
    })
  } else {
    res.status(401) // Unauthorized
    throw new Error('Invalid email or password')
  }
})

// @desc Register a new user
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  // const hash = bcrypt

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    res.status(400)
    throw new Error('User already exists')
  }
  const newUser = await User.create({
    name,
    email,
    password
  })

  if (newUser) {
    res.status(201)
    res.json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      isAdmin: user.isAdmin,
      _id: user._id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Get a user by id
// @route GET /api/users/:id
// @access Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found') // our errorHandler will be called with arguments err, req, res, next
  }
})

// @desc Update a user
// @route PUT /api/users/:id
// @access Private/Admin
export const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    const { name, email, isAdmin, password } = req.body
    if (name) user.name = name
    if (email) user.email = email
    if (isAdmin !== undefined) user.isAdmin = isAdmin
    if (password) user.password = password
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    const { name, email, password } = req.body
    if (name) user.name = name
    if (email) user.email = email
    if (password) user.password = password

    const updatedUser = await user.save() // !!pre hook to hash the password
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })
  } else {
    res.status(404)
    throw new Error('User not found') // our errorHandler will be called with args err, req, res, next
  }
})

// @desc Get all users (by admin)
// @route GET /api/users
// @access Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  if (!_.isEmpty(users)) {
    res.json(users)
  } else {
    res.status(404)
    throw new Error('Resources not found')
  }
})

// @desc Delete a user (by admin)
// @route DELETE /api/users/:id
// @access Private/Admin
export const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!_.isEmpty(user)) {
    await user.remove()
    res.json({ message: 'User has been removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
