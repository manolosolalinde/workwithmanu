import React from 'react';
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import styled from "@emotion/styled";
import colors from "styles/colors";
import { Link, graphql, withPrefix } from 'gatsby';
import Button from "components/_ui/Button";
import Layout from "components/Layout";
import styles from "../styles/mdproject.module.css";
import Moment from 'react-moment';
import { useEffect } from 'react';

const ProjectHeroContainer = styled("div")`
    background: ${colors.grey200};
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    position: relative;
    padding-top: 2.25em;
    margin-bottom: 3.5em;

    img {
        max-width: 600px;
    }
`

const ProjectTitle = styled("div")`
    max-width: 550px;
    margin: 0 auto;
    text-align: center;
`

const ProjectBody = styled("div")`
    max-width: 550px;
    margin: 0 auto;

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }
`

const WorkLink = styled(Link)`
    margin-top: 3em;
    display: block;
    text-align: center;
`

const ImageContainer = styled("div")`
    // max-height: 500px;
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: flex-start;
    -webkit-box-align: flex-start;
    -ms-flex-align: flex-start;
    align-items: flex-start;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-bottom: 3em;
`

const UnderImageContainer = styled("div")`
    max-width: 550px;
    margin: 0 auto;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 2em;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    font-size: 0.85em;
    color: #A9AAAB;
`
export const getBaseUrl = ({ project }) => {

    const { user, repository, relativeDirectory } = project;
    const base_url = `https://raw.githubusercontent.com/${user}/${repository}/main/${relativeDirectory}/`;
    return base_url;
}


const Project = ({ project, meta }) => {
    const { user, repository, relativeDirectory } = project;

    const { title, image_url, description, technologies, date } = project.childMarkdownRemark.frontmatter;
    const project_title = [{ text: title, type: "heading1" }];
    const project_description = [{ text: description, type: "paragraph" }];

    console.log(date);
    let mydate = "2021-12-01";
    //convert mydate YYYY-MM-DD to Month DD, YYYY



    //turn technologies comma separated text into a list
    const project_technologies = !technologies ? [] : technologies.split(",").map(tech => {
        // remove whitespaces from tech and make it lowercase
        const tech_name = tech.trim().toLowerCase();
        //remove dots from tech name
        const tech_name_no_dots = tech_name.replace(/\./g, '').replace(/\s/g, '-');

        return tech_name_no_dots;
    });






    // fix images urls
    const html = project.childMarkdownRemark.html;
    // const base_url = `https://raw.githubusercontent.com/${user}/${repository}/main/${relativeDirectory}/`;
    const base_url = getBaseUrl({ project });
    const html_with_images = html.replace(/(\.\/)/g, `${base_url}`);

    //remove h1 title if exists
    //replace only first h1 entry from html (/g)
    const html_with_images_no_h1 = title ? html_with_images.replace(/<h1>.+<\/h1>/g, ``) : html_with_images;

    //get hero image url
    const image_url_global = image_url.replace(/(\.\/)/g, `${base_url}`);
    const project_hero_image = image_url && { url: image_url_global, alt: title };

    // console.log(html_with_images);
    // console.log(project);


    useEffect(() => {
        function getRandomColors() {
            var number = Math.random();
            var color1 = "hsl(" + number * 360 + ", 100%, 95%)";
            var color2 = "hsl(" + number * 360 + ", 100%, 50%)";
            return [color1, color2];
        }
        var style = document.createElement('style')
        style.innerHTML = '.fw-btn--text { background-color: red; }'
        var hosts = document.getElementsByTagName('fw-button');

        async function loadTagColors() {

            for (var i = 0; i < hosts.length; i++) {
                var host = hosts[i];
                var sheet = new CSSStyleSheet
                var [color, color2] = getRandomColors();
                // var hash = document.createElement('span');
                // hash.innerHTML= '#';
                // hash.style.color = color;
                // host.appendChild(hash);
                sheet.replaceSync(`.fw-btn--text:hover:not([disabled]) { background-color: ${color}!important; }`);
                var sheet2 = new CSSStyleSheet
                sheet2.replaceSync(`.hashtag { color: ${color}!important; }`);
                if (host.shadowRoot) {
                    host.shadowRoot.adoptedStyleSheets = [...host.shadowRoot.adoptedStyleSheets, sheet]
                    host.getElementsByTagName('span')[0].style.color = color2;
                    console.log(host.shadowRoot.adoptedStyleSheets);
                }
            }
        }
        loadTagColors();
    });
    return (
        <>
            <Helmet
                title={`${project_title[0].text} | Work with Manuel`}
                titleTemplate={`%s | ${meta.title}`}
                meta={[
                    {
                        name: `description`,
                        content: meta.description,
                    },
                    {
                        property: `og:title`,
                        content: `${project_title[0].text} | Work with Manuel`,
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
            >
                {/* <script src='node_modules/@freshworks/crayons/dist/crayons.js'></script> */}
            </Helmet>
            <Layout>
                <ProjectTitle>
                    {/* centered */}
                    <h1 style={{ justifyContent: "center" }} >{title}</h1>
                    <div className="technologies">
                        <section style={{ marginBottom: '1em' }}>
                            {project_technologies.map((tech, index) =>
                                <fw-button className='fw-button' key={index} color="text">
                                    <span className='hashtag'>#</span>
                                    {tech}
                                </fw-button>
                            )}
                        </section>
                    </div>
                </ProjectTitle>
                {project_hero_image && (
                    // <ProjectHeroContainer>
                    <div>
                        <ImageContainer>
                            <a href={project_hero_image.url}>
                                <img src={project_hero_image.url} alt="bees" />
                            </a>
                        </ImageContainer>
                        {/* <UnderImageContainer> */}
                        <div className={styles.underImage}>
                            <div className={styles.underImageName}>
                                Manuel Solalinde
                            </div>
                            <div className={styles.underImageDate}>
                                <Moment format="MMMM D, YYYY">{date}</Moment>
                            </div>
                        </div>
                        {/* </UnderImageContainer> */}
                    </div>
                )}
                <ProjectBody>
                    {/* {RichText.render(project_description)} */}
                    <div dangerouslySetInnerHTML={{ __html: html_with_images_no_h1 }} />
                    <WorkLink to={"/projects"}>
                        <Button className="Button--secondary">
                            See other projects
                        </Button>
                    </WorkLink>
                </ProjectBody>
            </Layout>
        </>
    )
}

export default ({ data }) => {
    console.log(data);
    const projectContent = data.allGithubFile.nodes[0];
    const meta = data.site.siteMetadata;
    return (
        <Project project={projectContent} meta={meta} />
    )
}

Project.propTypes = {
    project: PropTypes.object.isRequired,
};

export const query = graphql`
    query mdProjectQuery($uid: String) {
        allGithubFile(filter: {base: {eq: $uid}, relativeDirectory: {eq: "projects"}}) {
            nodes {
              base
              relativeDirectory
              childMarkdownRemark {
                id
                html
                frontmatter {
                  title
                  image_url
                  description
                  technologies
                  date
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