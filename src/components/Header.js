import React from "react"
import Logo from "../images/icon.png"
import { Container, Navbar, Nav } from "react-bootstrap"

import "../css/header.scss"

export const Header = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="sm">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src={Logo}
              width="75"
              height="75"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Navbar.Brand>Schuster Software</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <Nav className="me-auto">
              <Nav.Link>Projects</Nav.Link>
              <Nav.Link>Contact</Nav.Link>
              <Nav.Link id="resume-link">Resume</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
