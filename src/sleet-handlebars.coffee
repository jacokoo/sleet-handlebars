DefaultTag = require './tags/tag'
ElseTag = require './tags/else'
EchoTag = require './tags/echo'
UnescapedEchoTag = require './tags/unescaped-echo'
BlockHelper = require './tags/block-helper'
InlineHelper = require './tags/inline-helper'
UnescapedInlineHelper = require './tags/unescaped-inline-helper'
If = require './predicts/if'
Unless = require './predicts/unless'
SelfClosingTag = require './tags/self-closing-tag'
blockHelpers = ['if', 'unless', 'each', 'with']
inlineHelpers = []

tags =
    else: ElseTag
    echo: EchoTag
    '@echo': UnescapedEchoTag

predicts =
    if: If
    unless: Unless

selfClosingTags = [
    'area', 'base', 'br', 'col', 'command'
    'embed', 'hr', 'img', 'input', 'keygen'
    'link', 'meta', 'param', 'source', 'track', 'wbr'
]

exports.overrideContext = (context, options, declearedOptions) ->
    context.setDefaultTag DefaultTag

    context.registerTag item, BlockHelper for item in blockHelpers
    context.registerTag key, value for key, value of tags
    context.registerTag item, SelfClosingTag for item in selfClosingTags
    context.registerPredict key, value for key, value of predicts

    if t = options.handlebars
        context.registerTag item, BlockHelper for item in t.block or []
        for item in t.inline or []
            context.registerTag item, InlineHelper
            context.registerTag '@' + item, UnescapedInlineHelper

    if t = declearedOptions.block
        context.registerTag item.trim(), BlockHelper for item in t.split(',') when item.trim()

    if t = declearedOptions.inline
        for item in t.split(',') when item.trim()
            item = item.trim()
            context.registerTag item, InlineHelper
            context.registerTag '@' + item, UnescapedInlineHelper

    context

exports.getDefaultExtension = -> 'hbs'
