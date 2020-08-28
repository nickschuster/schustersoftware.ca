// Component that controls the about section.

// Packages.
import React from "react"
import { Container, Row, Col } from "react-bootstrap"

//CSS.
import "../css/about.scss"

export default function About() {
    return (
        <Container fluid>
            <Row>
                <Col className="text-center"><br /><h1 className="page-title">About Schuster Development</h1><br /><br /></Col>
            </Row>
            <Row className="justify-content-center">
                <Col><p>Some content goes here</p></Col>
            </Row>
        </Container>
    )
}