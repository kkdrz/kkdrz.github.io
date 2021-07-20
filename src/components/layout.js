import * as React from "react"
import Footer from "./footer"
import Header from "./header"
import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faFacebookSquare,
  faGithubSquare,
  faLinkedin,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

library.add(faFacebookSquare, faGithubSquare, faLinkedin, faInstagramSquare, faEnvelope)

const Layout = ({ children }) => {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
