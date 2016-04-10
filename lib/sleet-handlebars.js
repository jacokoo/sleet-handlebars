'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDefaultExtension = getDefaultExtension;
exports.overrideContext = overrideContext;

var _valueIdentifier = require('./compiler/value-identifier');

var _blockSetting = require('./compiler/block-setting');

var _valueHelper = require('./compiler/value-helper');

function getDefaultExtension() {
    return 'hbs';
}

function overrideContext(context, options, declaration) {
    context.registerCompiler('value.identifier', new _valueIdentifier.ValueIdentifierCompiler());
    context.registerCompiler('setting.if', new _blockSetting.BlockSettingCompiler());
    context.registerCompiler('value.helper', new _valueHelper.HelperValueCompiler(1));
}