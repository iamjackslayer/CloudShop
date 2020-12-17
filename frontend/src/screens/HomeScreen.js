import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

const HomeScreen = ({ match, location }) => {
  const keyword = match.params.keyword
  const pagenum = match.params.pagenum || 1
  const dispatch = useDispatch()
  const { loading, error, products, page, numPages } = useSelector(
    state => state.productList
  )
  useEffect(() => {
    dispatch(listProducts(keyword, pagenum))
  }, [dispatch, keyword, pagenum])
  return (
    <>
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products &&
              products.map(p => (
                <Col sm={12} md={6} lg={4} xl={3} key={p._id}>
                  <Product product={p} />
                </Col>
              ))}
          </Row>
          <Row>
            <Paginate
              page={page}
              numPages={numPages}
              getUrlAtPage={p =>
                keyword ? `/search/${keyword}/page/${p}` : `/page/${p}`
              }
            />
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen
