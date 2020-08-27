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
                <Col lg={2}><img id="profile-image" src={require("../images/profile.png")} alt="Profile"/></Col>
                <Col lg={6}><h2>Nikolas Schuster</h2><p>some text about</p></Col>
            </Row>
        </Container>
    )
}