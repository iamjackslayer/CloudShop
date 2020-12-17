import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listProducts,
  deleteProduct,
  createProduct
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const { loading, error, products, page, numPages } = useSelector(
    state => state.productList
  )
  const userLogin = useSelector(state => state.userLogin)
  const productDelete = useSelector(state => state.productDelete)
  const productCreate = useSelector(state => state.productCreate)
  const pagenum = match.params.pagenum
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET }) // allows come back to this page after create success
    if (_.isEmpty(userLogin.userInfo) || !userLogin.userInfo.isAdmin) {
      history.push('/')
    } else {
      dispatch(listProducts('', pagenum))
    }
    if (productCreate.success) {
      history.push(`/admin/product/${productCreate.product._id}/edit`)
    }
  }, [history, dispatch, userLogin, productCreate, pagenum])

  const createProductHandler = e => {
    e.preventDefault()
    dispatch(createProduct())
  }
  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
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
      {productCreate.loading && <Loader />}
      {productDelete.error && <Message variant='danger'>{error}</Message>}
      {productDelete.loading && <Loader />}
      {productDelete.error && <Message variant='danger'>{error}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
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
          <Paginate
            numPages={numPages}
            page={page}
            getUrlAtPage={p => `/admin/productlist/page/${p}`}
          />
        </>
      )}
    </>
  )
}

export default ProductListScreen
