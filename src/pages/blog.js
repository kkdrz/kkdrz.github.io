import * as React from "react"
import { graphql } from "gatsby"
import {getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogPost from "../components/blog-post"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <p>
          No blog posts found.
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Blog posts" />

      <div
        className="mt-4 px-4 mx-auto flex flex-col xl:flex-row xl:flex-wrap xl:justify-center"
        style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const image = getImage(post.frontmatter.featuredImage)
          return (
            <div key={post.id} className="py-4 xl:px-6">
              <BlogPost
                title={title}
                date={post.frontmatter.date}
                excerpt={post.frontmatter.description || post.excerpt}
                slug={post.fields.slug}
                featuredImage={image}
              />
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD MMMM YYYY")
          title
          description
          featuredImage {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                aspectRatio: 1.5
              )
            }
          }
        }
      }
    }
  }
`
