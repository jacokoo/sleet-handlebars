{Echo} = require 'sleet'

module.exports = class EchoTag extends Echo
    tagOpenStart: '{{'
    tagOpenEnd: '}}'

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
