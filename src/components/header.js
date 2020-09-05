// Webpage header and navbar.

// Packages.
import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-scroll"

// CSS.
import "../css/header.scss"

export default function Header() {
    return (
        <Container fluid>
            <br />
            <Row className="justify-content-center">
                <Col><img id="logo-image" src={require("../images/biglogo.png")} alt="Schuster Development logo"/></Col>  
            </Row>
            <Row className="d-flex justify-content-center">
                <Col lg={2} xl={1} className="text-center">
                    <Link className="navbar-link" to="home" spy={true} smooth={true}>Home</Link>
                </Col>
                <Col lg={2} xl={1} className="text-center">
                    <Link className="navbar-link" to="contact" spy={true} smooth={true}>Contact</Link>
                </Col>
                <Col lg={2} xl={1} className="text-center">
                    <Link className="navbar-link" to="links" spy={true} smooth={true}>Links</Link>
                </Col>
            </Row>
            <br />
            <hr id="header-break"/>
            <br />
        </Container>
    )
}