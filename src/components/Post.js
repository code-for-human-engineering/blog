import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"

const Post = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
            edges {
              node {
                frontmatter {
                  title
                  excerpt
                  date
                  path
                }
              }
            }
          }
        }
      `}
      render={data => (
        <>
          {data.allMarkdownRemark.edges.map((node, i) => (
            <Link to={node.node.frontmatter.path}>
              <h1 key={i}>{node.node.frontmatter.title}</h1>
            </Link>
          ))}
        </>
      )}
    />
  )
}

export default Post
