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

downgraded:
```json
"gatsby-source-graphql-universal": "^3.2.0"
// from 3.3.0 to 3.2.0 to solve the following error:
// Error: Cannot find module './third-party/gatsby-node'
```


