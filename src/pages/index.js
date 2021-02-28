import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TypingEffect from "../components/typing-effect"

const Index = () => {
  return (
    <Layout>
      <div className="flex h-full items-center justify-center">
        <SEO title="Konrad Drozd Blog" />
        <TypingEffect />
      </div>
    </Layout>
  )
}

export default Index
