// Webpage header and navbar.

// Packages.
import React from "react"
import { Container, Row, Col } from "react-bootstrap"

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
                <Col className="mx-auto text-center">
                    <a className="navbar-link" href="#home">Home</a>
                    <a className="navbar-link" href="#home">About</a>
                    <a className="navbar-link" href="services">Contact</a>
                </Col>
            </Row>
            <br />
            <hr id="header-break"/>
            <br />
        </Container>
    )
}