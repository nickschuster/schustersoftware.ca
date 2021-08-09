import React, { useState } from "react"
import { Pages } from "../components/Pages"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Projects } from "../components/Projects"
import { Contact } from "../components/Contact"

import "../css/global.scss"
import { Container } from "react-bootstrap"

const Index = () => {
  const [page, setPage] = useState(Pages.projects)

  // Return the page to be displayed.
  const getCurrentPage = () => {
    if (page === Pages.projects) {
      return <Projects />
    } else if (page === Pages.contact) {
      return <Contact />
    }
  }

  return (
    <>
      <Header setPage={setPage} />
      <Container>{getCurrentPage()}</Container>
      <Footer />
    </>
  )
}

export default Index
