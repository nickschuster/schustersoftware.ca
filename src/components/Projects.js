import React from "react"

import "../css/projects.scss"

export const Projects = () => {
  return (
    <>
      <div className="project-container">
        <h1 className="projects-title">Projects</h1>

        <div className="project">
          <img
            className="project-logo"
            src="https://www.satiate.app/icons/icon-512x512.png"
          />
          <div className="project-text">
            <h1>Satiate (WIP)</h1>

            <a href="https://www.satiate.app">Website</a>
            {" - "}
            <a href="https://www.github.com/nickschuster/Satiate">Github</a>

            <p>Designed and developed Satiate using React and AWS Amplify.</p>
            <p>Technology: </p>
            <li>
              <ul>
                React, Material UI, AWS Amplify, AWS AppSync, AWS Lambda, AWS
                Cognito
              </ul>
            </li>
          </div>
        </div>
        <div className="project">
          <div className="no-image-available project-logo">C</div>

          <div className="project-text">
            <h1>Contagion Entertainment</h1>
            <p>
              Built and integrated GCP based authentication into a unity client
              using .NET Core.
            </p>
            <p>Technology: </p>
            <li>
              <ul>Unity, C#, GCP Auth, .NET Core</ul>
            </li>
          </div>
        </div>
        <div className="project">
          <div className="no-image-available project-logo">S</div>

          <div className="project-text">
            <h1>Sentry Health - User Portal</h1>
            <p>
              Built the Sentry Health user portal in Vue using Vuetify, Vuex and
              Material UI.
            </p>
            <p>Technology: </p>
            <li>
              <ul>Vue, Vuex, Vuetify, Material UI</ul>
            </li>
          </div>
        </div>
        <div className="project">
          <div className="no-image-available project-logo">S</div>

          <div className="project-text">
            <h1>Sentry Health - Billing API</h1>
            <p>
              Developed a billing microservice to interface with Stripe for
              billing and invoice management.
            </p>
            <p>Technology: </p>
            <li>
              <ul>Apollo GraphQL, GCP CloudRun, Stripe</ul>
            </li>
          </div>
        </div>
        <div className="project">
          <img
            className="project-logo"
            src="http://www.virtual-whiteboard.ca/icons/icon-512x512.png"
          />
          <div className="project-text">
            <h1>Virtual Whiteboard</h1>
            <a href="https://www.virtual-whiteboard.ca">Website</a>
            {" - "}
            <a href="https://www.github.com/nickschuster/Virtual-Whiteboard-Client">
              Github
            </a>
            <p>
              Designed and developed Virtual Whiteboard using JQuery and AWS
              Fargate.
            </p>
            <p>Technology: </p>
            <li>
              <ul>
                JQuery, Socket.IO, AWS Fargate, AWS API Gateway, AWS Lambda
              </ul>
            </li>
          </div>
        </div>
        <div className="project">
          <div className="no-image-available project-logo">Q</div>
          <div className="project-text">
            <h1>Quench</h1>
            <a href="https://www.github.com/nickschuster/Quench">Github</a>
            <p>Designed and developed Quench the android app in Java.</p>
            <p>Technology: </p>
            <li>
              <ul>
                Android, Java, Firebase Auth, GCP AdMobb, Firebase Firestore
              </ul>
            </li>
          </div>
        </div>
      </div>
    </>
  )
}
