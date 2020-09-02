// Controls the page footer

// Packages.
import React from "react"
import { Container, Row, Col } from "react-bootstrap"

// CSS.
import "../css/footer.scss"

const Footer = () => {
    // Keeps the footer stuck to the bottom of the page.
    const viewPortChanged = () => {
        let contentHeight = (document.getElementById("content-container").clientHeight +
                            document.getElementById("footer").clientHeight -
                            document.getElementById("push-footer").clientHeight)
        if(contentHeight < window.innerHeight) {
            document.getElementById("push-footer").style.height = window.innerHeight - contentHeight + "px"
        } else {
            document.getElementById("push-footer").style.height = "0px"
        }
    }

    React.useEffect(() => {
        setTimeout(() => viewPortChanged(), 100)
        window.addEventListener('resize', viewPortChanged)
    }, [])

    return (
        <React.Fragment>
            <Container fluid id="footer-background">
                <Row>
                    <Col className="text-center"><br /><h1>Links</h1><br /></Col>
                </Row>
                <Row className="justify-content-center">
                    <Col><a href="https://www.github.com/nickschuster"><img className="link-image" id="github-logo" src={require("../images/github-logo.png")} alt="GitHub"/></a></Col>
                    <Col><a href="https://www.linkedin.com/in/nikolas-schuster-25184b16b/" ><img className="link-image" id="linkedin-logo" src={require("../images/linkedin-logo.png")} alt="LinkedIn"/></a></Col>
                </Row>
                <Row>
                    <Col className="text-center"><br /><br /><p>&#169; 2020 Schuster Development</p><br /></Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Footer