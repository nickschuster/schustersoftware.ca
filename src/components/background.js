// Controls the background content.

// Packages.
import React from "react"

// CSS.
import "../css/background.scss"

export default function Background() {
    return (
        <img id="background-image" src={require("../images/background.png")} alt="Background."/>
    )
}