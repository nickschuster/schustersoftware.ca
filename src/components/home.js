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
                <br />
                <Row className="justify-content-center">
                    <Col className="form-group" lg={4} md={4} xs={12}>
                        <div>
                            <input type="image" className="service-image" src={require("../images/front-end.png")} alt="Front-end" onClick={frontendClicked}/>
                            <h2 className="service-title">Front-end</h2>
                        </div>
                        <Modal dialogClassName="service-modal" show={showFrontend} onHide={closeFrontend}>
                            <Modal.Header closeButton>
                                <Modal.Title>UX and UI</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Test modal</Modal.Body>
                        </Modal>
                    </Col>
                    <Col className="form-group" lg={4} md={4} xs={12}>
                        <div>
                            <input type="image" className="service-image" src={require("../images/middleware.png")} alt="Middleware" onClick={middlewareClicked}/>
                            <h2 className="service-title">Middleware</h2>
                        </div>
                        <Modal dialogClassName="service-modal" show={showMiddleware} onHide={closeMiddleware}>
                            <Modal.Header closeButton>
                                <Modal.Title>API's and Server's</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Test modal</Modal.Body>
                        </Modal>
                    </Col>
                    <Col className="form-group" lg={4} md={4} xs={12}>
                        <div>
                            <input type="image" className="service-image" src={require("../images/back-end.png")} alt="Back-end" onClick={backendClicked}/>
                            <h2 className="service-title">Back-end</h2>
                        </div>
                        <Modal dialogClassName="service-modal" show={showBackend} onHide={closeBackend}>
                            <Modal.Header closeButton>
                                <Modal.Title>Databases and Processing</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Test modal</Modal.Body>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}