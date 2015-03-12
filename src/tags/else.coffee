{Tag} = require 'sleet'

module.exports = class ElseTag extends Tag
    generate: (context) ->
        return if @options.__used__
        return unless @options.__paired__
        @options.__used__ = true

        context.eol().indent(@indent).push('{{else}}')
        for item in @children when not @isString(item)
            context.createTag(item, @).generate(context)
