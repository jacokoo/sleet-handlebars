Tag = require './tag'

module.exports = class SelfClosingTag extends Tag
    selfClosing: -> true
    generateContent: ->
