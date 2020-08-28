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
                    <Col className="text-center"><br /><h1 className="page-title">Contact Information</h1><br /><br /></Col>
                </Row>
                <Row>
                    <Col className="text-center"><h1>nick@schusterdevelopment.ca</h1></Col>
                </Row>
            </Container>
        </React.Fragment>   
    )
}