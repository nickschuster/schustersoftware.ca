// Controls the entire website.

// Packages.
import React from "react"
import Header from "../components/header"
import Home from "../components/home"
import About from "../components/about"
import Contact from "../components/contact"

// CSS.
import "../css/global.scss"

export default function index() {
  return (
    <React.Fragment>
      <div id="background">
        <div id="content-container">
          <Header /> 
          <Home />
          <About />
          <Contact />
        </div>
      </div> 
    </React.Fragment>
  )
}
