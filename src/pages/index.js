// Controls the entire website.

// Packages.
import React from "react"
import Header from "../components/header"

// CSS.
import "../css/global.scss"

export default function Home() {
  return (
    <React.Fragment>
      <div id="background">
        <Header /> 
        <hr></hr>
        <br></br>
      </div> 
    </React.Fragment>
  )
}
