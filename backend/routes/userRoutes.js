import express from 'express'
import {
  authUser,
  getUsers,
  getUserById
} from '../controllers/userController.js'
const router = express.Router()

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
router.route('/login').post(authUser)

router.route('/').get(getUsers)

router.route('/:id').get(getUserById)

export default router
