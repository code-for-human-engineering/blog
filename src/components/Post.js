import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import styled from "styled-components"
import Tema from "../Themes/Index"
import Img from "gatsby-image"
import GlobalStyle from "../components/globalStyle"

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
    transition: all 0.5s ease-out;
    width: 45%;
    margin-top: 1em;
    border-radius: 8px;
    max-width: 60%;
    box-shadow: rgba(40, 40, 40, 0.1) 0px 5px 50px;
  }
  .img{
    border-radius: 8px;
  }
  .title{
    font-family: ${Tema.font.primary};
    font-size: 2em;
    font-weight: bold;
  }
  .date{
    color: ${Tema.color.secondary};
    opacity: 0.4;
    font-size: 0.8em;
    margin-bottom: 0.5em;
  }
  .links{
    text-decoration: none;
    color: ${Tema.color.secondary};
  }
  .details{
    margin-top:0.5em;
    margin-left: 1em;
    margin-bottom: 1em;
  }
  .postCards:hover{
    transition: all 0.4s ease-in;
    box-shadow: rgba(40, 40, 40, 0.5) 0px 5px 50px;
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
                  date(formatString: "dddd, DD MMMM YYYY", locale: "en-EN")
                  path
                  featuredImage {
                    childImageSharp {
                      fluid(maxWidth: 800) {
                        base64
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
          <GlobalStyle />
          {data.allMarkdownRemark.edges.map((node, i) => (
            <div className="postCards">
              <Link className="links" to={node.node.frontmatter.path} key={i}>
                <Img
                  className="img"
                  fluid={
                    node.node.frontmatter.featuredImage.childImageSharp.fluid
                  }
                />
                <div className="details">
                  <div className="title">{node.node.frontmatter.title}</div>
                  <div className="date">{node.node.frontmatter.date}</div>
                  <div className="excerpt">{node.node.frontmatter.excerpt}</div>
                </div>
              </Link>
            </div>
          ))}
        </PostTheme>
      )}
    />
  )
}

export default Post
