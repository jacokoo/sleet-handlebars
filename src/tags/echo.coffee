{Tag} = require 'sleet'

module.exports = class EchoTag extends Tag
    tagOpenStart: '{{'
    tagOpenEnd: '}}'
    generate: (context) ->
        if @isInline then context.pop() else context.indent(@indent)

        @setAttribute item.name, item.value for item in group.attributes for group in @attributeGroups
        @generateAttribute item.name, item.value, context for item in @attributes

        context.eol()

    wrap: (context, value) ->
        context.push(@tagOpenStart).push(value).push(@tagOpenEnd)

    generateAttribute: (name, value, context) ->
        if value.length is 0
            context.push name.value if name.type is 'quoted'
            @wrap(context, name.value) if name.type is 'identifier'
            return

        return if name.value unless 'text'
        for item in value
            if item.type is 'identifier' then @wrap(context, item.value) else context.push item.value
