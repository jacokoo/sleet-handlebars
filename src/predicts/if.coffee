{Predict} = require 'sleet'

module.exports = class If extends Predict
    tagName: 'if'
    generate: (context) ->
        attrs = []
        for item in @attributes
            if item.name.value is 'class'
                @generateClass item.value, context
            else
                attrs.push item

        return unless attrs.length > 0
        context.push " {{##{@tagName} #{@content}}}"
        @tag.generateAttribute(item, context) for item in attrs
        context.push "{{/#{@tagName}}}"

    generateClass: (values, context) ->
        return unless values.length > 0

        attr = ((if item.type is 'identifier' then "{{#{item.value}}}" else item.value) for item in values).join(' ')
        @tag.setAttribute 'class', [value: "{{##{@tagName} #{@content}}}#{attr}{{/#{@tagName}}}", type: 'qouted']
