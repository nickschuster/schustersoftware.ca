import React from "react"
import VWLogo from "../images/vw.png"
import BSLogo from "../images/bs.png"
import NMLogo from "../images/nmb.png"
import QLogo from "../images/q.png"
import SLogo from "../images/s.png"

import "../css/projects.scss"

export const Projects = () => {
  return (
    <>
      <div className="project-container">
        <h1 className="projects-title">Projects</h1>

        <div className="project">
          <img className="project-logo" src={SLogo} />
          <div className="project-text">
            <h1>Satiate</h1>

            <a href="https://www.github.com/nickschuster/satiate">Github</a>
            {" - "}
            <a href="https://www.satiate.app">Website</a>

            <p>Designed and developed Satiate using React and AWS Amplify.</p>
            <p>Technology: </p>
            <p className="project-tech">
              React, Material UI, AWS Amplify, AWS AppSync, AWS Lambda, AWS
              Cognito
            </p>
          </div>
        </div>

        <div className="project">
          <img className="project-logo" src={VWLogo} />
          <div className="project-text">
            <h1>Virtual Whiteboard</h1>
            <a href="https://www.github.com/nickschuster/virtual-whiteboard-client">
              Github
            </a>
            {" - "}
            <a href="http://www.virtual-whiteboard.ca">Website</a>

            <p>
              Designed and developed Virtual Whiteboard using JQuery and AWS
              Fargate.
            </p>
            <p>Technology: </p>
            <p className="project-tech">
              JQuery, Socket.IO, AWS Fargate, AWS API Gateway, AWS Lambda
            </p>
          </div>
        </div>

        <div className="project">
          <img className="project-logo" src={QLogo} />
          <div className="project-text">
            <h1>Quench</h1>
            <a href="https://www.github.com/nickschuster/quench">Github</a>
            {" - "}
            <a href="https://play.google.com/store/apps/details?id=com.quench">
              Website
            </a>
            <p>Designed and developed Quench the android app in Java.</p>
            <p>Technology: </p>
            <p className="project-tech">
              Android, Java, Firebase Auth, GCP AdMobb, Firebase Firestore
            </p>
          </div>
        </div>

        <div className="project">
          <img className="project-logo" src={NMLogo} />
          <div className="project-text">
            <h1>Nine Mens Morris</h1>
            <a href="https://www.github.com/nickschuster/nine-mens-morris">
              Github
            </a>
            {" - "}
            <a href="https://en.wikipedia.org/wiki/Nine_men%27s_morris">
              Website
            </a>
            <p>
              Recreated the lesser known board game Nine Mens Morris in python,
              including a networked multiplayer mode.
            </p>
            <p>Technology: </p>
            <p className="project-tech">Python, PyGame, Sockets/Networking</p>
          </div>
        </div>

        <div className="project">
          <img className="project-logo" src={BSLogo} />
          <div className="project-text">
            <h1>Battle Snake 2022</h1>
            <a href="https://github.com/nickschuster/battlesnake-2020">
              Github
            </a>
            {" - "}
            <a href="https://play.battlesnake.com/">Website</a>
            <p>
              Developed a novel snake strategy for Battle Snake 2022 using
              hamiltonian cycles. Written in Python.
            </p>
            <p>Technology: </p>
            <p className="project-tech">Python</p>
          </div>
        </div>
      </div>
    </>
  )
}
