// Component controls contact information

// Packages.
import React from "react"
import { Container, Row, Col } from "react-bootstrap"

// CSS.
import "../css/contact.scss"

export default function Contact() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col className="text-center"><br /><h1 className="page-title">Contact</h1><br /><br /></Col>
                </Row>
                <Row>
                    <Col className="text-center"><a href="mailto:nick@schusterdevelopment.ca"><h1 id="email">nick@schusterdevelopment.ca</h1></a></Col>
                </Row>
                <Row>
                    <Col className="text-center"><br /><h1 id="phone">+1 (250) 213 2918</h1></Col>
                </Row>
                <Row>
                    <Col className="text-center"><p id="phone-details">9am to 5pm PDT<br /></p></Col>
                </Row>
            </Container>
        </React.Fragment>   
    )
}