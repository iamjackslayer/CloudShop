import express from 'express'
import {
  registerUser,
  authUser,
  getUserProfile,
  getUserById
} from '../controllers/userController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
router.route('/login').post(authUser)

// @desc Register a new user
// @route POST /api/users
// @access Public
router.route('/').post(registerUser)

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
router.route('/profile').get(protect, getUserProfile)

router.route('/:id').get(getUserById)

export default router
