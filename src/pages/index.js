// Controls the entire website.

// Packages.
import React from "react"
import Header from "../components/header"
import Home from "../components/home"

// CSS.
import "../css/global.scss"

export default function index() {
  return (
    <React.Fragment>
      <div id="background">
        <Header /> 
        <Home />
      </div> 
    </React.Fragment>
  )
}
