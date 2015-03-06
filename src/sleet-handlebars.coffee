{compile} = require 'sleet'
DefaultTag = require './tags/tag'
ElseTag = require './tags/else'
EchoTag = require './tags/echo'
BlockHelper = require './tags/block-helper'
InlineHelper = require './tags/inline-helper'
UnescapedInlineHelper = require './tags/unescaped-inline-helper'
If = require './predicts/if'
Unless = require './predicts/unless'

blockHelpers = ['if', 'unless', 'each', 'with']
inlineHelpers = []

tags =
    else: ElseTag
    echo: EchoTag

predicts =
    if: If
    unless: Unless

exports.compile = (input, options = {}) ->
    options.tags or= {}
    options.predicts or= {}

    options.tags[item] = BlockHelper for item in blockHelpers when not options.tags[item]
    options.tags[item] = InlineHelper for item in inlineHelpers when not options.tags[item]
    options.tags["@#{item}"] = UnescapedInlineHelper for item in inlineHelpers when not options.tags["@#{item}"]

    options.tags[key] = value for key, value of tags when not options.tags[key]
    options.predicts[key] = value for key, value of predicts when not options.predicts[key]

    compile input, options
