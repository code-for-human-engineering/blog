import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Post from "../components/Post"
import styled, { createGlobalStyle } from "styled-components"
import Tema from "../Themes/Index"
import { Helmet } from "react-helmet"

const HomeLayout = styled.div`
  margin: 0;
  padding: 0;
  .container {
    min-width: 100vw;
    min-height:calc(100vh + 2em);
    margin: 0;
    width: 100vw;
  }
  .topContainer {
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: ${Tema.color.secondary};
    flex-direction: column;
  }
  .titleHeader {
    font-family: ${Tema.font.primary};
    font-size: 5vw;
    color: ${Tema.color.backgroundSecondary};
  }
  .titleSubHeader {
    font-size: 100%;
    color: ${Tema.color.backgroundSecondary};
    font-family: "${Tema.font.secondary}";
  }
  .postContainer{
    min-height: 100vh;
    background: ${Tema.color.backgroundSecondary};
    padding-left: 2em;
    padding-right: 2em;
    min-height: 100vh;
  }
  .storyTitle{
    font-family:${Tema.font.primary};
    font-size: 3em;
  }
  .line{
    width: 100%;
    height: 5px;
    background: ${Tema.color.secondary};
  }
  .storyDesc{
    font-family: "${Tema.font.secondary}";
    font-size: 3vh;
    width: 70%;
  }
  @media only screen and (max-width: 600px) {
    .storyDesc{
      width: 100%;
    }
  }
`

const GlobalStyle = createGlobalStyle`
body{
  margin: 0px;
  padding: 0px;
}
`

const Header = () => (
  <>
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
        <>
          <div className="titleHeader">{data.site.siteMetadata.title}</div>{" "}
          <div className="titleSubHeader">
            {data.site.siteMetadata.description}
          </div>
        </>
      )}
    />
  </>
)

const Footer = () => (
  <FooterStyles>
    <a href="https://jofil.tech/" target="__blank" className="mainWebLink">
      MORE OF JONATHAN FILBERT
    </a>
  </FooterStyles>
)

const FooterStyles = styled.div`
  background: ${Tema.color.backgroundSecondary};
  width: 100%;
  height: 4em;
  font-family: ${Tema.font.secondary};
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  .mainWebLink {
    text-decoration: none;
    cursor: pointer;
    color: ${Tema.color.secondary};
  }
  .mainWebLink :hover {
    text-decoration: underline;
  }
`

const main = () => (
  <HomeLayout>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Code for Human by Jonathan Filbert</title>
      <meta name="description" content="A humane blog by Jonathan Filbert" />
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <GlobalStyle />
    <div className="container">
      <div className="topContainer">
        <Header />
      </div>
      <div className="postContainer">
        <div className="storyTitle">Stories</div>
        <div className="storyDesc">
          Written posts are a great way to express oneself and to show the rest
          of the world, that words can describe how one actually feels.
        </div>
        <div className="line" />
        <Post />
      </div>
    </div>
    <Footer />
  </HomeLayout>
)

export default main
