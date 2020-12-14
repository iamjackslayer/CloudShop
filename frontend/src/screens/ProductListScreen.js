import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector(state => state.productList)
  const userLogin = useSelector(state => state.userLogin)
  useEffect(() => {
    if (_.isEmpty(userLogin.userInfo) || !userLogin.userInfo.isAdmin) {
      history.push('/')
    }
    if (_.isEmpty(products)) {
      dispatch(listProducts())
    }
  }, [history, dispatch, userLogin, products])

  const createProductHandler = e => {
    e.preventDefault()
    console.log('create product')
  }
  const deleteHandler = id => {
    console.log('delete product')
  }
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped border hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>PRODUCT ID</th>
              <th>NAME</th>
              <th>IMAGE</th>
              <th>BRAND</th>
              <th>CATEGORY</th>
              <th>RATINGS</th>
              <th>NUMBER OF REVIEWS</th>
              <th>PRICE</th>
              <th>COUNT IN STOCK</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>
                  <Image src={product.image} fluid rounded />
                </td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.ratings}</td>
                <td>{product.numReviews}</td>
                <td>${product.price}</td>
                <td>{product.countInStock}</td>
                <td>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <Button variant='warning' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </Link>
                </td>
                <td>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={e => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductListScreen
