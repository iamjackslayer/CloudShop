import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  getProductDetails,
  createProductReview
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const { loading, product, error } = useSelector(state => state.productDetails)
  const productCreateReview = useSelector(state => state.productCreateReview)
  const { userInfo } = useSelector(state => state.userLogin)

  useEffect(() => {
    // reset the review form upon successful review creation
    if (productCreateReview.success) {
      dispatch({
        // so the next callback will not dispatch this
        type: PRODUCT_CREATE_REVIEW_RESET
      })
      // reset the form
      setRating(0)
      setComment('')
    }
    dispatch(getProductDetails(match.params.id))
  }, [match, dispatch, productCreateReview.success])

  const addToCartHandler = e => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(createProductReview(match.params.id, { rating, comment }))
  }
  if (_.isEmpty(product)) return <></>
  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: ${product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        $
                        {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(i => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message>No reviews for this product</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map(r => (
                  <ListGroup.Item key={r._id}>
                    <strong>{r.name}</strong>
                    <Rating value={r.rating} />
                    <p>{r.createdAt.substring(0, 10)}</p>
                    <p>{r.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer review</h2>
                  {productCreateReview.error && (
                    <Message variant='danger'>
                      {productCreateReview.error}
                    </Message>
                  )}
                  {!_.isEmpty(userInfo) ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Review</Form.Label>
                        <Form.Control
                          as='select'
                          custom
                          value={rating}
                          onChange={e => setRating(Number(e.target.value))}
                        >
                          {[...Array(5).keys()].map(v => (
                            <option key={v + 1} value={v + 1}>
                              {v + 1} -{' '}
                              {(v === 0 && 'Poor') ||
                                (v === 1 && 'Fair') ||
                                (v === 2 && 'Good') ||
                                (v === 3 && 'Very Good') ||
                                (v === 4 && 'Excellent')}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row={3}
                          placeholder='Write a review'
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        />
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
