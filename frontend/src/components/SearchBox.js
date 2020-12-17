import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const history = useHistory()

  const submitHandler = e => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        placeholder='Search products...'
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
