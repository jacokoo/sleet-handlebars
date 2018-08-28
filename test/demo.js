const hs = require('../lib').plugin
const {compile} = require('sleet')

const input = `#! handlebars inline=date
a(class=(a 'a'))
`

console.log(compile(input, {defaultPlugin: 'handlebars', plugins: {handlebars: hs}, ignoreSetting: false}).code)
