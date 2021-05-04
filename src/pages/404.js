import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data }) => {

  return (
    <Layout>
      <SEO title="404: Not Found" />
      <div className="flex flex-col h-full items-center justify-center">
        <h1 className="font-bold">404: Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist...</p>
      </div>
    </Layout>
  )
}

export default NotFoundPage
