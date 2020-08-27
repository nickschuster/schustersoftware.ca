// Gatsby configuration file

module.exports = {
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
    }
  ]
}
