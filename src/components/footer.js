import * as React from "react"
import { Link } from "gatsby"
import {
  faFacebookSquare,
  faGithubSquare,
  faLinkedin,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Footer = ({ children }) => {
  const SocialSquare = ({ href, icon }) => (
    <Link
      className="text-gray-100 p-2 hover:text-blue-100"
      to={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon size="3x" icon={icon} />
    </Link>
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
            <SocialSquare
              href="https://www.facebook.com/drozdkonrad"
              icon={faFacebookSquare}
            />
            <SocialSquare
              href="https://github.com/kkdrz"
              icon={faGithubSquare}
            />
            <SocialSquare
              href="https://www.linkedin.com/in/konrad-drozd-3a1021121/"
              icon={faLinkedin}
            />
            <SocialSquare
              href="https://www.instagram.com/konradrzd/"
              icon={faInstagramSquare}
            />
          </div>
        </div>
      </div>
      <div
        className="text-xs text-gray-300"
        style={{ backgroundColor: "#222" }}
      >
        <div className="md:w-128 py-4 px-4 m-auto">
          Copyright © 2020-{new Date().getFullYear()} Konrad Drozd. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
