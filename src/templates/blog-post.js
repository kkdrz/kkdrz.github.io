import * as React from "react"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { GatsbyImage } from "gatsby-plugin-image"
import BlogPost from "../components/blog-post"
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  let frontImg = (
    <GatsbyImage
      imgClassName="w-full"
      className="w-full mb-4 max-h-96"
      image={getImage(post.frontmatter.featuredImage)}
      alt="Front Picture"
    />
  )

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="m-auto px-2 md:w-128 border-b border-gray-400 text-justify"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1
            className=" font-semibold text-3xl mb-2 text-left"
            itemProp="headline"
          >
            {post.frontmatter.title}
          </h1>
          <p className="block mb-2 text-sm text-gray-600 leading-tight font-medium">
            <FontAwesomeIcon
              className="pr-1"
              size="lg"
              icon={faCalendarAlt}
            ></FontAwesomeIcon>
            {post.frontmatter.date}
          </p>
          {frontImg}
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      </article>
      <div className="mt-4 m-auto px-2 pb-4 md:w-128">
        <h3>Other articles:</h3>
        <div className="justify-around flex flex-col">
          <div className="mb-2">
            {previous && (
              <BlogPost
                title={previous.frontmatter.title}
                date={previous.frontmatter.date}
                excerpt={previous.frontmatter.description || post.excerpt}
                slug={previous.fields.slug}
                featuredImage={getImage(previous.frontmatter.featuredImage)}
              />
            )}
          </div>
          <div className="mb-2">
            {next && (
              <BlogPost
                title={next.frontmatter.title}
                date={next.frontmatter.date}
                excerpt={next.frontmatter.description || next.excerpt}
                slug={next.fields.slug}
                featuredImage={getImage(next.frontmatter.featuredImage)}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
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
    previous: markdownRemark(id: { eq: $previousPostId }) {
      excerpt(pruneLength: 160)
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
    next: markdownRemark(id: { eq: $nextPostId }) {
      excerpt(pruneLength: 160)
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
            )
          }
        }
      }
    }
  }
`
