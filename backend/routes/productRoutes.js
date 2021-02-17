// Router points to controller
import express from 'express'
import {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
} from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
import { clearCache } from '../middleware/cacheMiddleware.js'
const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.get('/top', getTopProducts)

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProductById)
  .put(protect, admin, clearCache, updateProduct)
router.route('/:id/reviews').post(protect, createProductReview)

export default router
