import express from 'express'
import {
  getProducts,
  getProductById
} from '../controllers/productController.js'
const router = express.Router()

// @desc  Fetch all products
// @route  GET /api/products
// @access  Public
router.get('/', getProducts)

// @desc  Fetch single product
// @route  GET /api/products/:id
// @access  Public
router.get('/:id', getProductById)

export default router
