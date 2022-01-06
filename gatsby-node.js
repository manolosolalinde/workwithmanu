const path = require('path');

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
    promise.then(result => {
        if (result.errors) {
            throw result.errors
        }
        return result
    });

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await wrapper(
        //prismic posts and projects were erased
        graphql(`
        {
            allGithubFile(filter: {base: {regex: "/.+md/"}, relativeDirectory: {eq: "projects"}}) {
                nodes {
                  base
                  relativeDirectory
                  childMarkdownRemark {
                    id
                    html
                    frontmatter {
                      title
                    }
                  }
                }
            }
        }
    `)
    )

    // const projectsList = result.data.prismic.allProjects.edges;
    // const postsList = result.data.prismic.allPosts.edges;
    const githubList = result.data.allGithubFile.nodes;


    // const projectTemplate = require.resolve('./src/templates/project.jsx');
    // const postTemplate = require.resolve('./src/templates/post.jsx');
    const mdProjectTemplate = require.resolve('./src/templates/mdproject.jsx');

    // projectsList.forEach(edge => {
    //     // The uid you assigned in Prismic is the slug!
    //     createPage({
    //         type: 'Project',
    //         match: '/work/:uid',
    //         path: `/work/${edge.node._meta.uid}`,
    //         component: projectTemplate,
    //         context: {
    //             // Pass the unique ID (uid) through context so the template can filter by it
    //             uid: edge.node._meta.uid,
    //         },
    //     })
    // })

    // postsList.forEach(edge => {
    //     createPage({
    //         type: 'Project',
    //         match: '/blog/:uid',
    //         path: `/blog/${edge.node._meta.uid}`,
    //         component: postTemplate,
    //         context: {
    //             uid: edge.node._meta.uid,
    //         },
    //     })
    // })

    githubList.forEach(node => {
        let new_uid = node.base.replace('.md', '');
        createPage({
            type: 'Project',
            match: '/projects/:uid',
            path: `/projects/${new_uid}`,
            component: mdProjectTemplate,
            context: {
                uid: node.base,
            }
        })
    })
}
