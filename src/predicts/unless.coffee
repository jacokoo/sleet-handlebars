{Predict} = require 'sleet'

module.exports = class Unless extends Predict
    tagName: 'unless'
    generate: (context) ->
        context.push " {{##{@tagName} #{@content}}}"
        @tag.generateAttribute(item, context) for item in @attributes
        context.push "{{/#{@tagName}}}"
