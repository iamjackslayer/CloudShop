import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          {/* <LinkContainer to='/'> */}
          <Navbar.Brand as={Link} to='/'>
            CloudShop
          </Navbar.Brand>
          {/* </LinkContainer> */}
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {/* <LinkContainer to='/cart'> */}
              <Nav.Link as={Link} to='/cart'>
                <i className='fas fa-shopping-cart'></i> Cart
              </Nav.Link>
              {/* </LinkContainer> */}
              {/* <LinkContainer to='/login'> */}
              <Nav.Link as={Link} to='/login'>
                <i className='fas fa-user'></i> Sign in
              </Nav.Link>
              {/* </LinkContainer> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
