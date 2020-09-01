// Controls the entire website.

// Packages.
import React from "react"
import Header from "../components/header"
import Home from "../components/home"
import Contact from "../components/contact"
import Footer from "../components/footer"
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

// CSS.
import "../css/global.scss"

export default function index() {

  const scrollToTop = () => {
    scroll.scrollToTop();
  }

  return (
    <React.Fragment>
      <div id="scroll-to-top" onClick={scrollToTop} role="a"></div>
      <div id="background">
        <div id="content-container">
          <Element name="home">
            <Header /> 
            <Home />
          </Element>
          <Element name="contact">
            <Contact />
          </Element>
          <div id="push-footer"></div>
        </div>
      </div> 
      <div id="footer">
        <Element name="links">
          <Footer />
        </Element>
      </div>
    </React.Fragment>
  )
}
