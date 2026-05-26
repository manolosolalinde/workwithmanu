# CLAUDE.md — `workwithmanu`

Guidance for Claude Code working in this repo. This is the **presentation layer** of the
portfolio: a Gatsby site that pulls project content from the separate `cv` repo at build
time and hero/about text from Prismic. See [ARCHITECTURE.md](./ARCHITECTURE.md) for the
full build-time content pipeline. Broader cross-repo context lives in the parent
`../CLAUDE.md`.

## Requirements (Node / npm)

This is a **Gatsby 2** project. Node version matters — use one of these:

| Node | npm | lockfile written | Notes |
| --- | --- | --- | --- |
| **16.x** (recommended) | 8.x | `lockfileVersion: 2` | Matches the Netlify production build. Use this. |
| 14.x | 6.x | `lockfileVersion: 1` | Also works, but `npm install` rewrites the lockfile to v1 — **do not commit that change** (`git checkout package-lock.json` afterwards). |

- **Node 18+ is NOT supported** — the Gatsby 2 toolchain breaks on it.
- Switch with [nvm](https://github.com/nvm-sh/nvm): `nvm use 16` (or `nvm install 16`).

### SCSS / `node-sass` / `.npmrc` (read before touching dependencies)

Styles compile with **Dart Sass** (`sass` + `sass-loader@10`), which is pure JavaScript and
needs **no native build**. `node-sass` is **not** a real dependency of this project — it is
only the legacy `node-sass@^4.9.0` *peer dependency* that `gatsby-plugin-sass` declares.

The repo's **`.npmrc` sets `legacy-peer-deps=true`** so npm 7+ does **not** auto-install that
phantom peer. This matters because `node-sass@4.14.1` has **no prebuilt binary for Node 16+
(ABI 93+)** and would otherwise try to compile from C++ source — which fails locally without
Python 2 + a toolchain, and is slow even where it succeeds (e.g. Netlify).

Rules:
- **Keep `.npmrc`.** Do not pass `npm install` flags that override `legacy-peer-deps`.
- The lockfile is intentionally node-sass-free. If `node-sass` reappears in
  `node_modules`/`package-lock.json`, the `.npmrc` was bypassed — fix that, don't compile it.
- Do not add `node-sass` to `package.json`; dart-sass already handles all SCSS.

## Dev setup

```bash
nvm use 16
cp .env-example .env       # fill secrets: CV_REPO_TOKEN, PRISMIC_REPOSITORY_NAME, ...
npm install                # .npmrc applies legacy-peer-deps automatically
npm run develop            # or: gatsby develop  ->  http://localhost:8000
```

- **Active branch:** work on **`workwithmanu_wsl`** (the maintained branch), not `master`. It
  differs from `master`: uses `@prismicio/gatsby-source-prismic-graphql` (not
  `gatsby-source-prismic-graphql`); `gatsby-config.js` strips CRLF from all env vars
  (`.replace(/\r?\n|\r/g, '')`); site metadata rebranded "Nestor" → "Manuel". See `notes.md`
  for the `webpack@4.19.1` / sass version pins.
- **`CV_REPO_TOKEN`** must be a valid GitHub token with read access to the `cv` repo, or the
  `@mosch/gatsby-source-github` plugin fetches nothing (401) and project pages fail to build.
- `.env` is gitignored — never commit it.

## Deploy

Netlify (`workwithmanu.com`), production branch **`workwithmanu_wsl`**, Node 16, build
command `npm run build`. **No build hooks** — the site rebuilds only on a push to
`workwithmanu_wsl` or a manual Netlify redeploy. Pushing to `cv` does **not** rebuild this
site (content is fetched only at build time). See `../CLAUDE.md` for the full verified
deploy-trigger analysis.
