InlineHelper = require './inline-helper'

module.exports = class UnescapedInlineHelper extends InlineHelper
    tagOpenStart: '{{{'
    tagOpenEnd: '}}}'

    getName: -> @name.slice(1)
