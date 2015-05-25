{runIt} = require 'sleet/lib/command'
{getCompileOptions, handlebarsPrecompile} = require './helper'
path = require 'path'

VERSION = 'Sleet-Handlebars version <%= version %>'

yargs = require('yargs').usage '$0 [options] input.st [input2.st...]'
    .describe 'b', 'Block helpers. Separated by comma(,)'
    .describe 'i', 'Inline block helpers. Separated by comma(,)'
    .describe 'p', 'Precompile the output'
    .describe 'a', 'Precompile use AMD style'
    .describe 'c', 'Precompile use CommonJs style'
    .describe 'o', 'The output directory'
    .describe 'e', 'The file extension of output file'
    .describe 'w', 'Watch file changes'
    .describe 'v', 'Show the version number'
    .describe 'h', 'Show this message'
    .alias 'b', 'block-helper'
    .alias 'i', 'inline-block-helper'
    .alias 'p', 'precompile'
    .alias 'a', 'amd'
    .alias 'c', 'commonjs'
    .alias 'o', 'output'
    .alias 'e', 'extension'
    .alias 'w', 'watch'
    .alias 'v', 'version'
    .alias 'h', 'help'
    .string 'i'
    .string 'b'
    .boolean 'v'
    .boolean 'h'
    .boolean 'w'
    .boolean 'p'
    .boolean 'a'
    .string 'c'
    .string 'e'
    .string 'o'

exports.run = ->
    argv = yargs.argv

    blocks = if argv.b then argv.b.split ',' else []
    inlineBlocks = if argv.i then argv.i.split ',' else []

    argv.compileOptions = getCompileOptions {blocks, inlineBlocks}
    argv.compileOptions.transform = (text, file) ->
        if argv.a
            handlebarsPrecompile text, amd: true, filename: path.basename(file)
        else if argv.c
            handlebarsPrecompile text, commonjs: argv.c
        else if argv.p
            handlebarsPrecompile text, name: path.basename(file)
        else
            text

    argv.files = argv._.slice()
    return yargs.showHelp() if argv.h
    return console.log VERSION if argv.v

    argv.e = argv.extension = 'js' if argv.a or argv.c or argv.p
    runIt argv
