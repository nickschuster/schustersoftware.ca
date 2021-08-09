import React from "react"

import "../css/contact.scss"

export const Contact = () => {
  return (
    <>
      <div className="contact-container">
        <h1>nick@schustersoftware.ca</h1>
        <h1>(250) 213 2918</h1>
        <a href="https://www.github.com/nickschuster">
          <img
            className="contact-image"
            src="https://icons-for-free.com/iconfiles/png/512/part+1+github-1320568339880199515.png"
          />
        </a>
        <a href="https://www.linkedin.com/in/nikolas-schuster-25184b16b/">
          <img
            className="contact-image"
            src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
          />
        </a>
      </div>
    </>
  )
}
