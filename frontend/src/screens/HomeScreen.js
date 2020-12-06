import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector(state => state.productList)
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  return (
    <>
      <h1>Latest products</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <Row>
          {products &&
            products.map(p => (
              <Col sm={12} md={6} lg={4} xl={3} key={p._id}>
                <Product product={p} />
              </Col>
            ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
