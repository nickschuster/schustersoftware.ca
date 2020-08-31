// Controls the entire website.

// Packages.
import React from "react"
import Header from "../components/header"
import Home from "../components/home"
import Contact from "../components/contact"
import Footer from "../components/footer"

// CSS.
import "../css/global.scss"

export default function index() {
  return (
    <React.Fragment>
      <div id="background">
        <div id="content-container">
          <Header /> 
          <Home />
          <Contact />
          <div id="push-footer"></div>
        </div>
      </div> 
      <div id="footer">
        <Footer />
      </div>
    </React.Fragment>
  )
}
