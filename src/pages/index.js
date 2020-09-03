// Controls the entire website.

// Packages.
import React from "react"
import Header from "../components/header"
import Home from "../components/home"
import Contact from "../components/contact"
import Footer from "../components/footer"
import { Element, animateScroll as scroll } from 'react-scroll'

// CSS.
import "../css/global.scss"

const index = () => {

  const scrollToTop = () => {
    scroll.scrollToTop();
  }

  // Determine if the scroll to top button is visible
  const windowScrolled = () => {
    if(window.scrollY === 0) {
      document.getElementById("scroll-to-top").style.display = "none";
    } else {
      document.getElementById("scroll-to-top").style.display = "block"
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', windowScrolled)
    setTimeout(() => windowScrolled(), 50)
  }, [])

  return (
    <React.Fragment>
      <div id="scroll-to-top" onClick={scrollToTop} role="button" tabIndex={-1} onKeyPress={scrollToTop} aria-label="Scroll to top."></div>
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

export default index
