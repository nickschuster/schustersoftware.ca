// Controls the entire website.

// Packages.
import React from "react"
import Header from "../components/header"
import Home from "../components/home"
import About from "../components/about"

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
        </div>
      </div> 
    </React.Fragment>
  )
}
