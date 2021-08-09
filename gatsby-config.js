// Gatsby configuration file

module.exports = {
  siteMetadata: {
    title: "Schuster Software - Full-stack Development",
    description:
      "Cloud leveraged applications designed and developed front-to-back. Serverless architecture as the design goal whenever possible. Your idea translated to technical specifications and implemented using the right technology.",
    author: "Schuster Software",
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-webfonts",
      options: {
        fonts: {
          google: [
            {
              family: "Ubuntu",
              variants: ["400", "700"],
            },
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Schuster Software`,
        short_name: `Schuster Software`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        icon_options: {
          purpose: `maskable`,
        },
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
  ],
}
