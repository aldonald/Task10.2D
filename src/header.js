import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import ChangeLogo from './photoupload'

const Header = (props) => {
  const [username, setUsername] = useState('Account')

  const setUser = () => {
    if (props.user && props.user.firstname) {
      setUsername(`${props.user.firstname} ${props.user.lastname}`)
    }
  }

  useEffect(setUser, [props])

  const LoggedInComponent = (
    <NavDropdown title={username} id="basic-nav-dropdown">
      <NavDropdown.Item href="/">Preferences</NavDropdown.Item>
      <ChangeLogo />
      <NavDropdown.Divider />
      <NavDropdown.Item href="/api/reqlogin" onClick={props.logout} >Logout</NavDropdown.Item>
    </NavDropdown>
  )

  return (
    <Navbar bg="light" variant="light" fixed="top">
      <Navbar.Brand href="/">iCrowdTask</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/howitworks">How it works</Nav.Link>
          <Nav.Link href="/mywork">Current Work</Nav.Link>
          <Nav.Link href="/newtask">Request a New Task</Nav.Link>
          <Nav.Link href="/pricing">Pricing</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        {props.loggedin &&
          LoggedInComponent}
        {!props.loggedin &&
          <Nav className="ml-auto">
            <Nav.Link href="/api/reqlogin/">Sign in</Nav.Link>
          </Nav>}

      </Navbar.Collapse>
    </Navbar>
  )
}

Header.propTypes = {
  loggedin: PropTypes.bool,
  logout: PropTypes.func,
  user: PropTypes.any
}

export default Header
