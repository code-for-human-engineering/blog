import React from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import Tema from "../Themes/Index"
import Img from "gatsby-image"
import GlobalStyles from "../components/globalStyle"

const TemplateStyle = styled.div`
  margin: 0;
  padding: 0;
  background: ${Tema.color.backgroundSecondary};
  .topContainer {
    min-width: 100vw;
    min-height: 100vh;
    background: ${Tema.color.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    align-content: center;
  }
  .title {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: ${Tema.font.primary};
    color: ${Tema.color.backgroundSecondary};
    font-size: 4em;
    z-index: 999;
    position: absolute;
    justify-content: center;
    align-items: center;
  }
  .blogTitle {
    font-size: 1em;
  }
  .coverImage {
    z-index: 0;
    opacity: 0.3;
    filter: saturate(0);
    min-width: 100vw;
    min-height: 100vh;
  }
  .excerpt {
    font-family: ${Tema.font.secondary};
    font-size: 0.4em;
    font-style: italic;
    text-align: center;
  }
  .date {
    font-family: ${Tema.font.secondary};
    font-weight: bold;
    display: flex;
    width: 100%;
    flex-direction: column;
    z-index: 100000;
    justify-content: space-between;
    font-size: 0.4em;
    position: absolute;
    top: 1em;
    flex-direction: row;
  }
  .home {
    margin-left: 1em;
    text-decoration: none;
    color: ${Tema.color.backgroundSecondary};
    font-family: ${Tema.font.primary};
  }
  .dateText {
    margin-right: 1em;
  }
  .postContainer {
    min-height: 100vh;
    max-width: 100%;
    background: ${Tema.color.backgroundSecondary};
    padding-left: 1em;
    padding-right: 1em;
    font-family: ${Tema.font.secondary};
    font-size: 2em;
  }
  .subtitle {
    font-family: ${Tema.font.primary};
    color: ${Tema.color.secondary};
    font-size: 2em;
    margin-top: 1em;
  }
  .navContainer {
    display: flex;
    height: 3em;
    justify-content: space-between;
    flex-direction: row;
    padding-left: 1em;
    padding-right: 1em;
    margin-top: 1em;
  }
  .divider {
    width: 100%;
    height: 0.3em;
    background: ${Tema.color.secondary};
  }
  .link {
    font-family: ${Tema.font.secondary};
    color: ${Tema.color.backgroundSecondary};
    text-decoration: underline;
    color: ${Tema.color.secondary};
  }
  .content {
    min-height: 100vh;
  }
  .tagsContainer {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
  @media only screen and (max-width: 600px) {
    .blogTitle {
      font-size: 1.5em;
    }
    .excerpt {
      font-size: 5vw;
    }
    .title {
      font-size: 2em;
    }
    .postContainer {
      font-size: 1em;
    }
    .home {
      font-size: 1.5em;
    }
    .dateText {
      font-size: 1.5em;
    }
  }
`
const TagsStyle = styled.div`
  margin: 1em;
  font-size: 0.3em;
  font-family: ${Tema.font.secondary};
  min-width: 5%;
  border-width: 1px;
  padding: 0.8em;
  border-color: white;
  border-radius: 100px;
  border-style: solid;

  @media only screen and (max-width: 600px) {
    font-size: 3vw;
  }
`

const Tags = props => <TagsStyle>{props.tags}</TagsStyle>

const Template = props => {
  const { tags } = props.data.markdownRemark.frontmatter
  return (
    <TemplateStyle>
      <GlobalStyles />
      <Helmet>
        <title>{`${props.data.markdownRemark.frontmatter.title} | Code for Human`}</title>
      </Helmet>
      <div className="topContainer">
        <Img
          className="coverImage"
          fluid={
            props.data.markdownRemark.frontmatter.featuredImage.childImageSharp
              .fluid
          }
        />
        <div className="title">
          <div className="date">
            <div>
              <Link className="home" to="/">
                Code for Human
              </Link>
            </div>
            <div className="dateText">
              {props.data.markdownRemark.frontmatter.date}
            </div>
          </div>
          <div className="blogTitle">
            {props.data.markdownRemark.frontmatter.title}
          </div>
          <div className="excerpt">
            {props.data.markdownRemark.frontmatter.excerpt}
          </div>
          <div className="tagsContainer">
            {tags.map(tag => (
              <Tags tags={tag} />
            ))}
          </div>
        </div>
      </div>
      <div className="postContainer">
        <div className="subtitle">
          {props.data.markdownRemark.frontmatter.title}
        </div>
        <div className="divider" />
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
        />
        <div className="divider" />
      </div>
      <div className="navContainer">
        {props.pageContext.prev && (
          <Link className="link" to={props.pageContext.prev.frontmatter.path}>
            Previous
          </Link>
        )}
        <Link className="link" to="/">
          Go home
        </Link>
        {props.pageContext.next && (
          <Link className="link" to={props.pageContext.next.frontmatter.path}>
            Next
          </Link>
        )}
      </div>
    </TemplateStyle>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
        tags
        excerpt
        date(formatString: "DD MMMM YYYY", locale: "en-ID")
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
`

export default Template
