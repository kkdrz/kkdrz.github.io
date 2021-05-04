import * as React from "react"
import Footer from "./footer"
import Header from "./header"

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
