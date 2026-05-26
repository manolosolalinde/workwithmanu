# Nestor M. Solalinde Portfolio Website

[Live Demo](https://workwithmanu.com)

This portfolio website is powered by [Gatsby](https://www.gatsbyjs.org/) and [Prismic](https://prismic.io/).

Project source files are fetched from my personal Github repository [cv](https://github.com/manolosolalinde/cv), which also holds the source markdown files of my personal [digital CV](https://manolosolalinde.github.io/), built with GitHub Pages.

> 📐 For how the site reads project content from the `cv` repo at build time (the full
> pipeline, image-URL rewriting, and deploy notes), see [ARCHITECTURE.md](./ARCHITECTURE.md).


## Setup

This is a Gatsby 2 project — use **Node 16.x** (npm 8.x).

To use with your own github cv repository and prismic homepage:
```bash
git clone https://github.com/manolosolalinde/workwithmanu.git <your-portfolio-name>
cd <your-portfolio-name>

nvm use 16                 # Node 16.x / npm 8.x

cp .env-example .env       # then edit .env with your secrets (CV_REPO_TOKEN, PRISMIC_REPOSITORY_NAME, ...)
npm install                # .npmrc applies legacy-peer-deps automatically
npm run develop            # or: gatsby develop  -> http://localhost:8000
```

## External links

Starter project and gatsby starter by [Marguerite Roth](https://github.com/margueriteroth)

Gatsby Prismic Starter: [https://github.com/margueriteroth/gatsby-prismic-starter-prist](https://github.com/margueriteroth/gatsby-prismic-starter-prist)

