// Webpage header and navbar.

// Packages.
import React from "react"
import { Container, Row, Col } from "react-bootstrap"

// CSS.
import "../css/header.scss"

export default function Header() {
    return (
        <Container fluid>
            <Row className="logo-background justify-content-center">
                <Col sm={6}><img id="logo-image" src={require("../images/biglogo.png")} alt="Schuster Development logo"/></Col>
            </Row>
        </Container>
    )
}