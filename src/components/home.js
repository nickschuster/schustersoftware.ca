// Component with general info.

// Packages.
import React from "react"
import { Container, Row, Col, Modal } from "react-bootstrap"

// CSS.
import "../css/home.scss"

export default function Home() {
    const [showFrontend, setShowFrontend] = React.useState(false);
    const [showMiddleware, setShowMiddleware] = React.useState(false);
    const [showBackend, setShowBackend] = React.useState(false);

    const frontendClicked = () => setShowFrontend(true)
    const closeFrontend = () => setShowFrontend(false)

    const middlewareClicked = () => setShowMiddleware(true)
    const closeMiddleware = () => setShowMiddleware(false)

    const backendClicked = () => setShowBackend(true)
    const closeBackend = () => setShowBackend(false)

    return (
        <React.Fragment>
            <Container fluid>
                <Row className="justify-content-center">
                    <Col className="text-center mx-auto" xs={12}><h1 className="page-title">Full-stack Web Development</h1><br /></Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="text-center"><p id="intro-blurb">
                    Cloud leveraged web applications designed and developed front-to-back. 
                    <br /><br />
                    Serverless architecture as the design goal whenever possible.
                    <br /><br />
                    Your idea translated to technical specifications and implemented using cutting edge technology.
                    </p></Col>
                </Row>
                <br />
                <Row className="justify-content-center">
                    <Col className="form-group" lg={4} md={4} xs={12}>
                        <div>
                            <input type="image" className="service-image" src={require("../images/front-end.png")} alt="Front-end" onClick={frontendClicked}/>
                            <h2 className="service-title">Front-end</h2>
                        </div>
                        <Modal dialogClassName="service-modal" show={showFrontend} onHide={closeFrontend}>
                            <Modal.Header closeButton>
                                <Modal.Title>Front-end</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ul>
                                    <li>User interface design and implementation</li><br />
                                    <li>Search engine optimization</li><br />
                                    <li>Platform/Mobile compatibility</li><br />
                                    <li>Client and server side rendering</li>
                                </ul>
                            </Modal.Body>
                        </Modal>
                    </Col>
                    <Col className="form-group" lg={4} md={4} xs={12}>
                        <div>
                            <input type="image" className="service-image" src={require("../images/middleware.png")} alt="Middleware" onClick={middlewareClicked}/>
                            <h2 className="service-title">Middleware</h2>
                        </div>
                        <Modal dialogClassName="service-modal" show={showMiddleware} onHide={closeMiddleware}>
                            <Modal.Header closeButton>
                                <Modal.Title>Middleware</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ul>
                                    <li>API design and implementation</li><br />
                                    <li>Authentication and authorization</li><br />
                                    <li>Load balancing and usage scaling</li><br />
                                    <li>Server side processing</li>
                                </ul>
                            </Modal.Body>
                        </Modal>
                    </Col>
                    <Col className="form-group" lg={4} md={4} xs={12}>
                        <div>
                            <input type="image" className="service-image" src={require("../images/back-end.png")} alt="Back-end" onClick={backendClicked}/>
                            <h2 className="service-title">Back-end</h2>
                        </div>
                        <Modal dialogClassName="service-modal" show={showBackend} onHide={closeBackend}>
                            <Modal.Header closeButton>
                                <Modal.Title>Back-end</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ul>
                                    <li>Database design and implementation</li><br />
                                    <li>SQL schema design and normalization</li><br />
                                    <li>NoSQL optimization</li>
                                </ul>
                            </Modal.Body>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}