import express from 'express'
import {
  registerUser,
  authUser,
  getUserProfile,
  getUserById,
  updateUserProfile,
  getAllUsers,
  deleteUserById,
  updateUserById
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/login').post(authUser)

router.route('/').post(registerUser).get(protect, admin, getAllUsers)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route('/:id')
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUserById)
  .put(protect, admin, updateUserById)

export default router
