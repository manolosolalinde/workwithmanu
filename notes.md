## Important changes of this branch

Replaced `gatsby-source-prismic-graphql` by `@prismicio/gatsby-source-prismic-graphql`

removed from package.json:
```json
"node-sass"
// because of error with netlify
```
replaced with:
```json
"sass",
"sass-loader"
```

added to package.json:
```json
"webpack": webpack@4.19.1
//because webpack@5.11.0 was not working
```

## How to install different versions of nodejs

Install node 12:
```
curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
```

Install node 14:
```
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
```

