module.exports = {
  siteMetadata: {
    title: `Nestor Solalinde's Portfolio`,
        description: `Nestor Solalinde's Portfolio and Featured Projects`,
    author: `Nestor M. Solalinde`,
  },
  plugins: [
    {
      resolve: `@mosch/gatsby-source-github`,
      options: {           
        repository: "cv",
        tree: true,
        releases: true,
        user: "manolosolalinde",
        secrets: {
          token: "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",
        }
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {},
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-image`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
        resolve: 'gatsby-source-prismic-graphql',
        options: {
            repositoryName: 'workwithnestor', // (REQUIRED, replace with your own)
            linkResolver: () => post => `/${post.uid}`,
        }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-prismic-starter-prist`,
        short_name: `prist`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    // https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/
    {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
            trackingId: "YOUR_GOOGLE_ANALYTICS_TRACKING_ID",
            head: true,
        },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}


// GET https://api.github.com/repos/{USER}/{REPO}/git  /trees/HEAD?recursive=1
// GET https://api.github.com/repos/manolosolalinde/cv/git  /trees/HEAD?recursive=1

// funciona: https://api.github.com/repos/manolosolalinde/cv/git/trees/HEAD?recursive=1