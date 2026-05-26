# Architecture: how the site reads project content from the `cv` repo

This site (`workwithmanu`, a Gatsby app deployed on Netlify at
[workwithmanu.com](https://workwithmanu.com)) contains **no project content of its own**.
Every project page is generated **at build time** from markdown files in a *separate*
GitHub repository, [`manolosolalinde/cv`](https://github.com/manolosolalinde/cv), which is
fetched over the GitHub API while Gatsby builds.

```
cv/projects/bkv_sd.md  ──(GitHub API, build time)──►  Gatsby build  ──►  /projects/bkv_sd
cv/projects/images/…   ──(served live as raw URLs)──►  visitor's browser
```

> The browser never queries `cv` for text — only for images (via `raw.githubusercontent`
> URLs). All text/HTML is baked into the static site at build time. Consequently, **editing
> `cv` does not change the live site until `workwithmanu` is rebuilt on Netlify.**

---

## The pipeline, step by step

### 1. Source plugin fetches the `cv` repo file tree

`gatsby-config.js`:

```js
{
  resolve: `@mosch/gatsby-source-github`,
  options: {
    repository: GITHUB_CV_REPOSITORY,   // "cv"
    tree: true,                          // pull the full git tree
    releases: true,
    user: GITHUB_CV_USERNAME,            // "manolosolalinde"
    secrets: { token: CV_REPO_TOKEN },   // GitHub personal access token (from .env)
  }
}
```

During `gatsby build` / `gatsby develop`, this plugin calls the GitHub REST API
(equivalent to `https://api.github.com/repos/manolosolalinde/cv/git/trees/HEAD?recursive=1`)
and creates one **`GithubFile`** node per file in Gatsby's GraphQL data layer. Each node
carries `base` (filename, e.g. `bkv_sd.md`), `relativeDirectory` (e.g. `projects`), `user`,
and `repository`. The token in `.env` (`CV_REPO_TOKEN`) is what authorizes the read.

### 2. Markdown is transformed into HTML + frontmatter

`gatsby-config.js` registers `gatsby-transformer-remark`. For every markdown `GithubFile`,
it attaches a **`childMarkdownRemark`** child node containing:

- `html` — the rendered HTML of the markdown body
- `frontmatter` — the parsed YAML header (`title`, `description`, `image_url`, `date`,
  `order`, `technologies`, `category`, optional `redirect_link`, …)

### 3. One page is generated per project markdown file

`gatsby-node.js` queries all markdown files whose directory is `projects`, then creates a
page for each:

```js
graphql(`{
  allGithubFile(filter: {base: {regex: "/.+md/"}, relativeDirectory: {eq: "projects"}}) {
    nodes { base, relativeDirectory, childMarkdownRemark { html, frontmatter { title } } }
  }
}`)
// …for each node:
let new_uid = node.base.replace('.md', '');     // "bkv_sd.md" -> "bkv_sd"
createPage({
  path: `/projects/${new_uid}`,                 // -> /projects/bkv_sd
  component: mdProjectTemplate,                  // src/templates/mdproject.jsx
  context: { uid: node.base },                   // passes "bkv_sd.md" to the template
})
```

This is the step that turns `cv/projects/bkv_sd.md` into the URL `/projects/bkv_sd`.

### 4. The template queries its one file and renders it

`src/templates/mdproject.jsx` runs a per-page query filtered by the `base` filename passed
via page context:

```js
query mdProjectQuery($uid: String) {
  allGithubFile(filter: {base: {eq: $uid}, relativeDirectory: {eq: "projects"}}) {
    nodes {
      base, relativeDirectory, user, repository
      childMarkdownRemark { html, frontmatter { title image_url description technologies date } }
    }
  }
}
```

It then injects the rendered HTML directly:
`<div dangerouslySetInnerHTML={{ __html: html_with_images_no_h1 }} />`.

### 5. Relative image paths are rewritten to GitHub raw URLs

Markdown uses **relative** paths like `./images/bkv/single.png`. Those files are not served
by this site, so the template rewrites them to point at GitHub's raw host
(`src/templates/mdproject.jsx`):

```js
const getBaseUrl = ({ user, repository, relativeDirectory }) =>
  `https://raw.githubusercontent.com/${user}/${repository}/main/${relativeDirectory}/`;
// -> https://raw.githubusercontent.com/manolosolalinde/cv/main/projects/

const html_with_images = html.replace(/(\.\/)/g, base_url);     // every "./" -> raw URL
const image_url_global = image_url.replace(/(\.\/)/g, base_url); // hero image too
```

So `./images/bkv/single.png` resolves to
`https://raw.githubusercontent.com/manolosolalinde/cv/main/projects/images/bkv/single.png`,
loaded from GitHub by the visitor's browser at view time.

The same `allGithubFile` query + `getBaseUrl` rewrite feeds the `/projects` listing
(`src/pages/projects.js`) and the homepage's featured projects (`src/pages/index.js`).

---

## What comes from where

| Content | Source | Mechanism |
|---|---|---|
| Project pages (text/HTML) | `cv/projects/*.md` | GitHub API at build time → baked into static HTML |
| Project images | `cv/projects/images/` | rewritten to `raw.githubusercontent.com`, loaded live by the browser |
| Homepage hero & about text | **Prismic CMS** | `allHomepages` GraphQL query at build time |
| Site layout, styling, components | this repo (`src/**`) | normal Gatsby build |

## Build & deploy notes

- Use **Node 16.x** locally (Gatsby 2; matches Netlify). See `CLAUDE.md` for the Node/npm
  requirements and the `node-sass`/`.npmrc` note, and `notes.md` for the webpack/sass pins.
- Needs a `.env` (copy `.env-example`): `CV_REPO_TOKEN`, `PRISMIC_REPOSITORY_NAME`,
  `GITHUB_CV_REPOSITORY`, `GITHUB_CV_USERNAME`, `YOUR_GOOGLE_ANALYTICS_TRACKING_ID`.
- Deployed on Netlify (site `goofy-spence-99049a`), production branch **`workwithmanu_wsl`**,
  build `npm run build` → `public/`, plugin `@netlify/plugin-gatsby`.
- **There is no automation that rebuilds this site when `cv` changes** (no build hooks, no
  webhooks, no GitHub Actions). After editing `cv`, trigger a Netlify redeploy (dashboard
  "Trigger deploy" or `netlify deploy --build`) for the changes to appear.
