const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("src/templates/blogPost.js")

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { order: ASC, fields: [frontmatter___date] }
            ) {
              edges {
                node {
                  frontmatter {
                    path
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        const post = result.data.allMarkdownRemark.edges
        post.forEach(({ node }, index) => {
          const path = node.frontmatter.path
          createPage({
            path,
            component: blogPost,
            context: {
              pathSlug: path,
              prev: index === 0 ? null : post[index - 1].node,
              next: index === post.length - 1 ? null : post[index + 1].node,
            },
          })
        })
      })
    )
  })
}
