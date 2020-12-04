import React from 'react'
import { Row, Col } from 'react-bootstrap'
import products from '../products'
import Product from '../components/Product'

const HomeScreen = () => {
  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map(p => (
          <Col sm={12} md={6} lg={4} xl={3} key={p._id}>
            <Product product={p} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
