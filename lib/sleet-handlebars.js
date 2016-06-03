'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDefaultExtension = getDefaultExtension;
exports.overrideContext = overrideContext;

var _valueIdentifier = require('./compiler/value-identifier');

var _blockSetting = require('./compiler/block-setting');

var _valueHelper = require('./compiler/value-helper');

var _blockTag = require('./compiler/block-tag');

var _elseTag = require('./compiler/else-tag');

var _inlineTag = require('./compiler/inline-tag');

var _echo = require('./compiler/echo');

function getDefaultExtension() {
    return 'hbs';
}

function overrideContext(context, options, declaration) {
    context.registerCompiler('value.identifier', new _valueIdentifier.ValueIdentifierCompiler());
    context.registerCompiler('setting.if', new _blockSetting.BlockSettingCompiler());
    context.registerCompiler('setting.unless', new _blockSetting.BlockSettingCompiler());
    context.registerCompiler('value.helper', new _valueHelper.ValueHelperCompiler(1));
    context.registerCompiler('tag.else', new _elseTag.ElseTagCompiler());
    context.registerCompiler('tag.if', new _blockTag.BlockTagCompiler());
    context.registerCompiler('tag.each', new _blockTag.BlockTagCompiler());
    context.registerCompiler('tag.unless', new _blockTag.BlockTagCompiler());
    context.registerCompiler('tag.with', new _blockTag.BlockTagCompiler());
    context.registerCompiler('tag.echo', new _echo.EchoCompiler());
    context.registerCompiler('tag.@echo', new _echo.EchoCompiler(true));

    if (options.handlebars) {
        (options.handlebars.block || []).forEach(function (item) {
            context.registerCompiler('tag.' + item, new _blockTag.BlockTagCompiler());
        });
        (options.handlebars.inline || []).forEach(function (item) {
            context.registerCompiler('tag.' + item, new _inlineTag.InlineTagCompiler());
            context.registerCompiler('tag.@' + item, new _inlineTag.InlineTagCompiler(true));
        });
    }

    var blocks = declaration.option('block');
    blocks && blocks.split(',').forEach(function (item) {
        context.registerCompiler('tag.' + item, new _blockTag.BlockTagCompiler());
    });

    var inlines = declaration.option('inline');
    inlines && inlines.split(',').forEach(function (item) {
        context.registerCompiler('tag.' + item, new _inlineTag.InlineTagCompiler());
        context.registerCompiler('tag.@' + item, new _inlineTag.InlineTagCompiler(true));
    });
}