import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "components/Layout";
import ProjectCard from "components/ProjectCard";
import { getBaseUrl } from "../templates/mdproject";

const WorkTitle = styled("h1")`
    margin-bottom: 1em;
`

const Project = ({ projects, meta }) => (


    <>
        <Helmet
            title={`Projects`}
            titleTemplate={`%s | ${meta.title}`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: `Projects`,
                },
                {
                    property: `og:description`,
                    content: meta.description,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: meta.author,
                },
                {
                    name: `twitter:title`,
                    content: meta.title,
                },
                {
                    name: `twitter:description`,
                    content: meta.description,
                },
            ].concat(meta)}
        />
        <Layout>
            <WorkTitle>
                Projects
            </WorkTitle>
            <>
                {projects.map((project, i) => {
                    const frontmatter = project.childMarkdownRemark.frontmatter;
                    const {title,description,category,image_url,redirect_link} = frontmatter;
                    const uid = project.base.replace(/\.md$/, "");
                    const project_title = [{text:title,type:"heading1"}];
                    const project_description = {text:description,type:"paragraph"};
                    const project_category = [{text:category,type:"paragraph"}];
                    const baseUrl = getBaseUrl({project});
                    const image_url_global = image_url ? image_url.replace(/(\.\/)/g, `${baseUrl}`): null;
                    const project_thumbnail = {url:image_url_global,alt:title};
                return(
                    <ProjectCard
                        relativeDirectory={project.relativeDirectory}
                        key={i}
                        category={project_category}
                        title={project_title}
                        description={project_description}
                        thumbnail={project_thumbnail}
                        uid={uid}
                        redirect_link={redirect_link}
                    />
                )
                }
                
                )}
            </>
        </Layout>
    </>
);

export default ({ data }) => {
    const projects = data.allGithubFile.nodes.sort((a,b) => {
        const af = a.childMarkdownRemark.frontmatter;
        const bf = b.childMarkdownRemark.frontmatter;
        return af.order - bf.order;
    });
    const meta = data.site.siteMetadata;
    if (!projects) return null;

    return (
        <Project projects={projects} meta={meta}/>
    )
}

Project.propTypes = {
    projects: PropTypes.array.isRequired,
};

export const query = graphql`
    {
        allGithubFile(filter: {base: {regex: "/.+md/"}, relativeDirectory: {eq: "projects"}}) {
            nodes {
            base
            relativeDirectory
            childMarkdownRemark {
                id
                frontmatter {
                    title
                    image_url_global
                    image_url
                    description
                    order
                    redirect_link
                    category
                }
            }
            user
            repository
            }
        }
          
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`

