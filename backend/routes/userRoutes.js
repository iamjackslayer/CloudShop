import express from 'express'
import {
  registerUser,
  authUser,
  getUserProfile,
  getUserById,
  updateUserProfile,
  getAllUsers
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/login').post(authUser)

router.route('/').post(registerUser).get(protect, admin, getAllUsers)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router.route('/:id').get(getUserById)

export default router
