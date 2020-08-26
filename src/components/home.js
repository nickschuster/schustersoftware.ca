// Component with general info.

// Packages.
import React from "react"
import { Container, Row, Col } from "react-bootstrap"

// CSS.
import "../css/home.scss"

export default function Home() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row className="justify-content-center">
                    <Col className="text-center mx-auto" xs={12}><h1 id="home-title">Full-stack Web Development</h1></Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}