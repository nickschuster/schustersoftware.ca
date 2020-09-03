// Gatsby configuration file

module.exports = {
  siteMetadata: {
    title: "Schuster Development - Full-stack Web Development",
    description: "Cloud leveraged web applications designed and developed front-to-back. Serverless architecture as the design goal whenever possible. Your idea translated to technical specifications and implemented using cutting edge technology.",
    author: "Schuster Development"
  },
  plugins: [
    "gatsby-plugin-sass", 
    {
      resolve: "gatsby-plugin-prefetch-google-fonts",
      options: {
        fonts: [
          {
            family: "Noto Sans JP",
            variants: ['400', '700']
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Schuster Development`,
        short_name: `Schuster Development`,
        start_url: `/`,
        background_color: `#5c5c5c`,
        theme_color: `#0076ff`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        icon_options: {
          purpose: `maskable`,
        }
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet"
  ]
}
