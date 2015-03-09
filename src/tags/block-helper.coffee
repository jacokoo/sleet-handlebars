{Tag} = require 'sleet'

module.exports = class BlockHelper extends Tag
    tagOpenStart: '{{#'
    tagOpenEnd: '}}'
    tagCloseStart: '{{/'
    tagCloseEnd: '}}'

    constructor: ->
        super
        @elseTag = @findElse()

    generateOpenStart: (context) ->
        if @isInline
            context.pop()
        else
            context.indent(@indent)

        context.push(@tagOpenStart).push(@getName())

    getName: -> @name

    generateAttribute: ({name, value}, context) ->
        value or= []
        context.push(' ')
        if name.type is 'identifier'
            context.push name.value
        else if name.type is 'quoted'
            return context.push "\"#{name.value}\""
        else
            return context.push name.value

        return if value.length is 0

        values = (if item.type is 'quoted' then '"' + item.value + '"' else item.value for item in value)
        context.push('=').push(values.join '')

    generateOpenEnd: (context) ->
        context.push @tagOpenEnd
        context.eol() if @needNewLineTokenAfterTagOpen() or @selfClosing()

    generateClose: (context) ->
        return if @selfClosing()

        @generateElse context

        context.indent(@indent) if @needNewLineTokenAfterTagOpen() and not @haveInlineChild
        context.pop() if @haveInlineChild
        context.push(@tagCloseStart).push(@getName()).push(@tagCloseEnd).eol()

    needNewLineTokenAfterTagOpen: ->
        result = super
        return true if result
        return !!@elseTag

    generateElse: (context) ->
        return unless @elseTag
        @elseTag.__paired__ = true
        context.createTag(@elseTag, @parent).generate(context)

    findElse: ->
        siblings = @parent.options.children
        return item for item, i in siblings when item.name is 'else' and not item.__used__ and i > 0 and siblings[i - 1].name is @name
        null
