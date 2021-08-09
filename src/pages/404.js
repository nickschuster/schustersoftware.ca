// Basic 404 page.

import { navigate } from "gatsby"
import React, { useEffect } from "react"

export default function PageNotFound() {
  useEffect(() => {
    navigate("/")
  })

  return <></>
}
