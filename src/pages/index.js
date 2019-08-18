import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Post from "../components/Post"

const Header = () => (
  <div>
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => (
        <div>
          <div>{data.site.siteMetadata.title}</div>{" "}
          <div>{data.site.siteMetadata.description}</div>{" "}
        </div>
      )}
    />
  </div>
)

const main = () => (
  <div>
    <Header />
    <Post />
  </div>
)

export default main
