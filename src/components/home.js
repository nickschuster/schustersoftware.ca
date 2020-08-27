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
                <br />
                <Row className="justify-content-center">
                    <Col className="form-group" lg={3} md={4} xs={12}>
                        <img className="service-image" src={require("../images/front-end.png")} alt="Front-end" />
                        <div className="service-title">Front-end</div>
                        <br />
                    </Col>
                    <Col className="form-group" lg={3} md={4} xs={12}>
                        <img className="service-image" src={require("../images/middleware.png")} alt="Middleware" />
                        <div className="service-title">Middleware</div>
                        <br />
                    </Col>
                    <Col className="form-group" lg={3} md={4} xs={12}>
                        <img className="service-image" src={require("../images/back-end.png")} alt="Back-end" />
                        <div className="service-title">Back-end</div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}