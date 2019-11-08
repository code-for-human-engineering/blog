import React from "react"
import { StaticQuery } from "gatsby"
import Img from "gatsby-image"

const HeroImage = () => (
  <StaticQuery
    query={graphql`
      {
        file(relativePath: { eq: "hero.jpg" }) {
          childImageSharp {
            fluid {
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
    `}
    render={image => {
      return (
        <Img className="heroImage" fluid={image.file.childImageSharp.fluid} />
      )
    }}
  />
)

export default HeroImage
