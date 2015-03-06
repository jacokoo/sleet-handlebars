BlockHelper = require './block-helper'

module.exports = class InlineHelper extends BlockHelper
    tagOpenStart: '{{'
    selfClosing: -> true
