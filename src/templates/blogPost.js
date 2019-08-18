import React from "react"
import { graphql, Link } from "gatsby"

const Template = props => {
  console.log(props)
  const { tags } = props.data.markdownRemark.frontmatter
  return (
    <React.Fragment>
      <Link to="/">Go home</Link>
      <div>
        {tags.map(tag => (
          <p>{tag}</p>
        ))}
      </div>
      <h1>{props.data.markdownRemark.frontmatter.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
      />
      {props.pageContext.prev && (
        <Link to={props.pageContext.prev.frontmatter.path}>Previous</Link>
      )}
      {props.pageContext.next && (
        <Link to={props.pageContext.next.frontmatter.path}>Next</Link>
      )}
    </React.Fragment>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
        tags
      }
    }
  }
`

export default Template
