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
                    <Col className="text-center"><br /><h1 className="page-title">Contact</h1><br /></Col>
                </Row>
                <Row>
                    <Col className="text-center"><a style={{textDecoration: "none"}} href="mailto:nick@schustersoftware.ca"><h1 id="email">nick@<span style={{color: "#0076ff"}}>schuster</span>software.ca</h1></a></Col>
                </Row>
                <Row>
                    <Col className="text-center"><br /><h1 id="phone">+1 (250) 213 2918</h1><br /><br /></Col>
                </Row>
                <Row className="justify-content-center">
                    <Col><a href="https://www.linkedin.com/in/nikolas-schuster-25184b16b/" ><img className="link-image" id="linkedin-logo" src={require("../images/linkedin-logo.png")} alt="LinkedIn"/></a><br /><br/></Col>
                </Row>
            </Container>
        </React.Fragment>   
    )
}