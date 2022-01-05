/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import { withPrefix } from "gatsby";

// You can delete this file if you're not using it

// import React from 'react'

export const onRenderBody = ({ setPostBodyComponents, setHeadComponents  }) => {
    setHeadComponents ([
        <script src="https://unpkg.com/@freshworks/crayons/dist/crayons/crayons.js"/>
        // <script src='node_modules/@freshworks/crayons/dist/crayons.js'></script>
        // <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/default.min.css" />
        // <script src={withPrefix('/tagcolors.js')}/>
    ]);

    setPostBodyComponents([
        // <script src={withPrefix('/tagcolors.js')}/>
        // <script type='text/javascript' src='src/utils/tagcolors.js'></script>

        // <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js" />,
    ])
}