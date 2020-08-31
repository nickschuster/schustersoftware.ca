// Controls the page footer

// Packages.
import React from "react"
import { Container, Row, Col } from "react-bootstrap"

// CSS.
import "../css/footer.scss"

const Footer = () => {
    // Keeps the footer stuck to the bottom of the page.
    const viewPortChanged = () => {
        console.log("called")
        let contentHeight = (document.getElementById("content-container").clientHeight +
                            document.getElementById("footer").clientHeight -
                            document.getElementById("push-footer").clientHeight)
        if(contentHeight < window.innerHeight) {
            document.getElementById("push-footer").style.height = window.innerHeight - contentHeight + "px"
        } else {
            document.getElementById("push-footer").style.height = "0px"
        }

        console.log("content", contentHeight)
        console.log("window", window.innerHeight)
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
            </Container>
        </React.Fragment>
    )
}

export default Footer