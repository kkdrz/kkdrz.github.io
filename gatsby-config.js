module.exports = {
  siteMetadata: {
    title: `Konrad Drozd: Blog`,
    author: {
      name: `Konrad Drozd`,
      summary: `Fullstack Software Developer`,
      mail: "konrad@kdrozd.pl"
    },
    description: ``,
    siteUrl: `https://kdrozd.pl`,
    social: [
      {
        title: "Facebook",
        url: "https://www.facebook.com/drozdkonrad",
        icon: ["fab", "facebook-square"],
      },
      {
        title: "Github",
        url: "https://github.com/kkdrz",
        icon: ["fab", "github-square"],
      },
      {
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/konrad-drozd-3a1021121/",
        icon: ["fab", "linkedin"],
      },
      {
        title: "Instagram",
        url: "https://www.instagram.com/konradrzd/",
        icon: ["fab", "instagram-square"],
      },
      {
        title: "E-mail",
        url: "mailto:konrad@kdrozd.pl",
        icon: ["fas", "envelope"],
      },
    ],
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Table of Contents",
              tight: true,
              ordered: false,
              fromHeading: 1,
              toHeading: 3,
              className: "table-of-contents"
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,

              prompt: {
                user: "konrad",
                host: "kkdrz",
                global: false,
              },
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-plugin-fontawesome-css`,
          `gatsby-remark-external-links`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/",
        serialize: ({ path }) => {
          return {
            url: path,
          }
        },
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Konrad Drozd Blog RSS Feed"
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Konrad Drozd Blog`,
        short_name: `Drozd Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
            'G-ZXMPLSG5ND',
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
  ],
}
