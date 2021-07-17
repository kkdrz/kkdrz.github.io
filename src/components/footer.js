import * as React from "react"
import {
  faFacebookSquare,
  faGithubSquare,
  faLinkedin,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons"
import {faEnvelope} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { OutboundLink } from "gatsby-plugin-google-gtag"

const Footer = () => {
  const SocialSquare = ({ href, icon, title }) => (
    <OutboundLink
      className="text-gray-100 p-2 hover:text-blue-100"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon title={title} size="3x" icon={icon} />
    </OutboundLink>
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
              title="Facebook"
              href="https://www.facebook.com/drozdkonrad"
              icon={faFacebookSquare}
            />
            <SocialSquare
              title="Github"
              href="https://github.com/kkdrz"
              icon={faGithubSquare}
            />
            <SocialSquare
              title="LinkedIn"
              href="https://www.linkedin.com/in/konrad-drozd-3a1021121/"
              icon={faLinkedin}
            />
            <SocialSquare
              title="Instagram"
              href="https://www.instagram.com/konradrzd/"
              icon={faInstagramSquare}
            />
            <SocialSquare
              title="E-mail"
              href="mailto:konrad@kdrozd.pl"
              icon={faEnvelope}
            />
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
