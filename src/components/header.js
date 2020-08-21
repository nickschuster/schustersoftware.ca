// Basic navbar header.

import React from "react"
import { Navbar, Nav } from "react-bootstrap"

import "../css/header.scss"

export default function Header() {
    return (
        <Navbar variant="custom" expand="lg">
            <Navbar.Brand>Schuster Development</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav"/>
            <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}