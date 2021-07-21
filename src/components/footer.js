import * as React from "react"
import SocialSquare from "./SocialSquare"
import { graphql, useStaticQuery } from "gatsby"

const Footer = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            social {
              title
              url
              icon
            }
          }
        }
      }
    `
  )

  return (
    <footer
      className="flex flex-col text-white"
      style={{ backgroundColor: "#323232" }}
    >
      <div>
        <div className="md:w-128 m-auto py-8 px-4 flex flex-col">
          <div className="uppercase pb-2 font-bold text-sm text-gray-100 mb-2">
            You can find me there:
          </div>
          <div>
            {site.siteMetadata.social?.map((social, i) => (
              <SocialSquare
                key={i}
                className="text-gray-100 p-2 hover:text-blue-100"
                title={social.title}
                href={social.url}
                icon={social.icon}
              ></SocialSquare>
            ))}
          </div>
        </div>
      </div>
      <div
        className="text-xs text-gray-300"
        style={{ backgroundColor: "#222" }}
      >
        <div className="md:w-128 py-4 px-4 m-auto">
          Copyright © 2020-{new Date().getFullYear()} Konrad Drozd. All rights
          reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
