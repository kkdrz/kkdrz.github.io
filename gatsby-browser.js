import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/global.css"

// Highlighting for code blocks
import "./src/prismjs-darcula.css"

// workaround for deprecated gatsby-plugin-fontawesome-css
config.autoAddCss = false

require("prismjs/plugins/command-line/prism-command-line.css")
