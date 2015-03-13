Handlebars = require 'handlebars'

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

exports.getCompileOptions = (options = {}) ->
    options.defaultTag = DefaultTag
    bs = blockHelpers.concat options.blocks or []
    ibs = inlineHelpers.concat options.inlineBlocks or []

    options.tags or= {}
    options.predicts or= {}

    options.tags[item] = BlockHelper for item in bs when not options.tags[item]
    options.tags[item] = InlineHelper for item in ibs when not options.tags[item]
    options.tags["@#{item}"] = UnescapedInlineHelper for item in ibs when not options.tags["@#{item}"]

    options.tags[key] = value for key, value of tags when not options.tags[key]
    options.tags[key] = SelfClosingTag for key in selfClosingTags when not options.tags[key]
    options.predicts[key] = value for key, value of predicts when not options.predicts[key]

    options

exports.handlebarsPrecompile = (input, options = {}) ->
    output = Handlebars.precompile input
    if options.amd
        wrapAmd output
    else if options.commonjs
        wrapCommonJs output, options.commonjs
    else
        wrap output, options.name

wrapAmd = (input) ->
    "define(['handlebars.runtime'], function (H){ return H.template(#{input}); });"

wrapCommonJs = (input, module) ->
    "var H = require('#{module}'); module.exports = H.template(#{input});"

wrap = (input, name) -> """(function(){
    var templates = Handlebars.templates = Handlebars.templates || {};
    templates['#{name}'] = Handlebars.template(#{input});
})();"""
