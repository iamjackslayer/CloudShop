import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Image } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getProductDetails } from '../actions/productActions'

const ProductEditScreen = ({ match }) => {
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const [name, setName] = useState(productDetails.product.name)
  const [image, setImage] = useState(productDetails.product.image)
  const [brand, setBrand] = useState(productDetails.product.brand)
  const [category, setCategory] = useState(productDetails.product.category)
  const [description, setDescription] = useState(
    productDetails.product.description
  )
  const [price, setPrice] = useState(productDetails.product.price)
  const [countInStock, setCountInStock] = useState(
    productDetails.product.countInStock
  )

  useEffect(() => {
    if (match.params.id !== productDetails.product._id) {
      dispatch(getProductDetails(match.params.id))
      setName(productDetails.product.name)
      setImage(productDetails.product.image)
      setBrand(productDetails.product.brand)
      setCategory(productDetails.product.category)
      setDescription(productDetails.product.description)
      setPrice(productDetails.product.price)
      setCountInStock(productDetails.product.countInStock)
    }
  }, [dispatch, productDetails.product, match])

  const submitHandler = e => {
    e.preventDefault()
    console.log('submit')
  }
  return (
    <>
      <Link to={`/admin/productlist`} className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {productDetails.loading ? (
          <Loader />
        ) : productDetails.error ? (
          <Message variant='danger'>{productDetails.error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter product name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Image src={image} fluid alt='Image' />
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={e => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='category'></Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Describe the product'
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
