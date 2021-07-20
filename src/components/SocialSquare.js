import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import React from "react"

const SocialSquare = ({ href, icon, title, className }) => (
  <OutboundLink
    href={href}
    className={className}
    target="_blank"
    rel="noopener noreferrer"
  >
    <FontAwesomeIcon title={title} size="3x" icon={icon} />
  </OutboundLink>
)

export default SocialSquare
