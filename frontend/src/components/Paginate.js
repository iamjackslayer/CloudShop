import React from 'react'
import { Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ numPages, page, getUrlAtPage }) => {
  return (
    <Pagination>
      {[...Array(numPages).keys()].map(v => (
        <LinkContainer to={getUrlAtPage(v + 1)} key={v + 1}>
          <Pagination.Item key={v + 1} active={page === v + 1}>
            {v + 1}
          </Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  )
}

export default Paginate
