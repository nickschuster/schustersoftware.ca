import React from "react"

import "../css/header.scss"

export const Header = () => {
  return (
    <>
      <div className="header-container">
        <div className="header-center">
          <div className="header-logo">
            <div className="header-image"></div>
            <div className="header-text"></div>
          </div>
          <div className="header-navigation">
            <div className="header-nav-item"></div>
            <div className="header-nav-item"></div>
            <div className="header-nav-item"></div>
          </div>
        </div>
      </div>
    </>
  )
}
