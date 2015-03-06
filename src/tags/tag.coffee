{Tag} = require 'sleet'

module.exports = class DefaultTag extends Tag
    generateAttribute: ({name, value}, context) ->
        context.push(' ').push name.value
        if name.value is 'class'
            sep = ' '
        else
            sep = ''
            value.push value: name.value, type: 'quoted' if value.length is 0

        values = ((if item.type is 'identifier' then '{{' + item.value + '}}' else item.value) for item in value)
        context.push('="').push(values.join sep).push('"')
