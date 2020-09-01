// Controls the entire website.

// Packages.
import React from "react"
import Header from "../components/header"
import Home from "../components/home"
import Contact from "../components/contact"
import Footer from "../components/footer"
import { Element } from "react-scroll"

// CSS.
import "../css/global.scss"

export default function index() {
  return (
    <React.Fragment>
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
