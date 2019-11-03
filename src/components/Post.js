import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import styled from "styled-components"
import Tema from "../Themes/Index"
import Img from "gatsby-image"

const PostTheme = styled.div`
  display: flex;
  width: 100%;
  padding: 0;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0;
  h1 {
    margin: 0;
  }
  font-family: "${Tema.font.secondary}";
  .postCards {
    width: 45%;
    /* background: red; */
    margin-top: 1em;
    max-width: 60%;
  }
  .title{
    font-family: ${Tema.font.primary};
    font-size: 2em;
  }
  .links{
    text-decoration: none;
    color: ${Tema.color.secondary};
  }
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    .postCards{
      max-width: 100%;
      width: 100%;
    }
  }
`

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
                  featuredImage {
                    childImageSharp {
                      fluid(maxWidth: 800) {
                        base64
                        tracedSVG
                        aspectRatio
                        src
                        srcSet
                        srcWebp
                        srcSetWebp
                        sizes
                        originalImg
                        originalName
                        presentationWidth
                        presentationHeight
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={data => (
        <PostTheme>
          {data.allMarkdownRemark.edges.map((node, i) => (
            <div className="postCards" key={i}>
              <Img
                fluid={
                  node.node.frontmatter.featuredImage.childImageSharp.fluid
                }
              />
              <div className="title">{node.node.frontmatter.title}</div>
              <div className="date">
                Date Posted: {node.node.frontmatter.date}
              </div>
              <div className="excerpt">{node.node.frontmatter.excerpt}</div>
              <Link className="links" to={node.node.frontmatter.path}>
                <b>> Read more</b>
              </Link>
            </div>
          ))}
        </PostTheme>
      )}
    />
  )
}

export default Post
