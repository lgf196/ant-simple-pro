import 'highlight.js'
import Hljs from 'highlight.js/lib/core'

import css from 'highlight.js/lib/languages/css'
import json from 'highlight.js/lib/languages/json'
import less from 'highlight.js/lib/languages/less'
import scss from 'highlight.js/lib/languages/scss'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'

Hljs.registerLanguage('css', css)
Hljs.registerLanguage('json', json)
Hljs.registerLanguage('less', less)
Hljs.registerLanguage('scss', scss)
Hljs.registerLanguage('javascript', javascript)
Hljs.registerLanguage('typescript', typescript)

export default Hljs
