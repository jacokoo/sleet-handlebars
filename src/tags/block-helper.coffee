{Tag} = require 'sleet'

module.exports = class BlockHelper extends Tag
    tagOpenStart: '{{#'
    tagOpenEnd: '}}'
    tagCloseStart: '{{/'
    tagCloseEnd: '}}'

    constructor: ->
        super
        @elseTag = @findElse()

    generateTagStart: (context) ->
        context.push(@tagOpenStart).push(@getName())

    getName: -> @name

    generateAttribute: ({name, value}, context) ->
        context.push(' ')
        if name.type is 'identifier'
            context.push name.value
        else if name.type is 'quoted'
            return context.push "\"#{name.value}\""
        else
            return context.push name.value

        return if value.length is 0

        values = for item in value
            if item.type is 'quoted' then '"' + item.value + '"' else item.value

        context.push('=').push(values.join '')

    generateOpenEnd: (context) ->
        context.push @tagOpenEnd

    generateClose: (context) ->
        return if @selfClosing()
        @generateElse context
        context.eol().indent(@indent) if @elseTag or (@childrenContext.indented and not @options.haveInlineChild)
        @generateTagEnd context

    generateTagEnd: (context) ->
        context.push(@tagCloseStart).push(@getName()).push(@tagCloseEnd)

    generateElse: (context) ->
        return unless @elseTag
        @elseTag.__paired__ = true
        context.createTag(@elseTag, @parent).generate(context)

    findElse: ->
        siblings = @parent.options.children
        return item for item, i in siblings when item.name is 'else' and not item.__used__ and i > 0 and siblings[i - 1].name is @name
        null
