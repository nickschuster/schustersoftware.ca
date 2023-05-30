import React from "react"
import Logo from "../images/icon.png"
import { Container, Navbar, Nav } from "react-bootstrap"
import { Pages } from "./Pages"

import "../css/header.scss"

export const Header = ({ setPage }) => {
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
            <Nav className="ml-auto">
              <Nav.Link onClick={() => setPage(Pages.projects)}>
                Projects
              </Nav.Link>
              <Nav.Link onClick={() => setPage(Pages.contact)}>
                Contact
              </Nav.Link>
              <Nav.Link id="resume-link" href="./resume.pdf" download>
                Resume
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
