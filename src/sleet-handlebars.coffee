{compile} = require 'sleet'
{getCompileOptions, handlebarsPrecompile} = require './helper'

exports.compile = (input, options = {}) ->
    compiled = compile input, getCompileOptions(options)
    if options.precompile then handlebarsPrecompile(compiled, options.precompile) else compiled
