import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc  Fetch all products
// @route  GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 2
  const page = Number(req.query.page) || 1
  const keyword = req.query.keyword
    ? {
        name: new RegExp(req.query.keyword, 'i')
      }
    : {}
  const count = await Product.count({ ...keyword })
  const products = await Product.find({ ...keyword })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
  res.json({ products, page, numPages: Math.ceil(count / pageSize) })
})

// @desc  Fetch single product
// @route  GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found') // our errorHandler will be called
  }
})

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProductById = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product has been deleted' })
  } else {
    res.status(404)
    throw new Error('Product not found') // our errorHandler will be called
  }
})

// @desc Create a sample product
// @route POST /api/products
// @access Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({
    user: req.user._id,
    name: 'Sample name',
    image: '/images/ketchupmug.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    description: 'Sample description',
    price: 0,
    countInStock: 0
  })

  res.status(201).json(product)
})

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const toUpdate = await Product.findById(req.params.id)
  const {
    name,
    image,
    brand,
    category,
    description,
    price,
    countInStock
  } = req.body
  if (!toUpdate) {
    res.status(404)
    throw new Error('Product not found')
  }
  if (name) toUpdate.name = name
  if (image) toUpdate.image = image
  if (brand) toUpdate.brand = brand
  if (category) toUpdate.category = category
  if (description) toUpdate.description = description
  if (price) toUpdate.price = price
  if (countInStock) toUpdate.countInStock = countInStock

  await toUpdate.save()
  res.json(toUpdate)
})

// @desc Create a review
// @route POST /api/products/:id/reviews
// access Private
export const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  // Check if product has already been reviewed.
  const alreadyReviewed = product.reviews.find(
    r => r.user.toString() === req.user._id.toString()
  )
  if (alreadyReviewed) {
    res.status(400)
    throw new Error('User has reviewed the product')
  }
  const { rating, comment } = req.body
  if (!rating || !comment) {
    res.status(400)
    throw new Error('No rating or comment found')
  }
  product.reviews.push({
    rating: Number(rating),
    comment,
    user: req.user._id,
    name: req.user.name
  })
  product.numReviews = product.reviews.length
  product.rating = Number(
    (
      product.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
      product.numReviews
    ).toFixed(2)
  )
  const updatedProduct = await product.save()
  res.json(updatedProduct)
})
