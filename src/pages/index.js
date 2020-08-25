// Controls the entire website.

// Packages.
import React from "react"
import Header from "../components/header"
import Background from "../components/background"

// CSS.
import "../css/global.scss"

export default function Home() {
  return (
    <React.Fragment>
      <Header />  
      <Background />
    </React.Fragment>
  )
}
