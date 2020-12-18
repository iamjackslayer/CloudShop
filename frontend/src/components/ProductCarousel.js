import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Message from './Message'
import Loader from './Loader'
import { getTopProducts } from '../actions/productActions'
import styles from './ProductCarousel.module.scss'

const ProductCarousel = () => {
  const dispatch = useDispatch()
  const productTopRated = useSelector(state => state.productTopRated)
  const { loading, error, products } = productTopRated
  useEffect(() => {
    dispatch(getTopProducts())
  }, [dispatch])

  const handleSelect = (idx, e) => {}
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> {error}</Message>
      ) : (
        <Carousel
          pause='hover'
          onSelect={handleSelect}
          className={`bg-dark ${styles.carousel}`}
        >
          {products.map(product => (
            <Carousel.Item
              interval={2500}
              key={product._id}
              className={styles['carousel-item']}
            >
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} fluid />
                <Carousel.Caption className={styles['carousel-caption']}>
                  <h2>
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  )
}

export default ProductCarousel
