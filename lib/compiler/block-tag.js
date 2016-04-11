'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BlockTagCompiler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tag = require('sleet/lib/compiler/tag');

var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlockTagCompiler = exports.BlockTagCompiler = function (_TagCompiler) {
    _inherits(BlockTagCompiler, _TagCompiler);

    function BlockTagCompiler() {
        _classCallCheck(this, BlockTagCompiler);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BlockTagCompiler).call(this));

        _this.TOKEN_OPEN_START = '{{#';
        _this.TOKEN_OPEN_END = '}}';
        _this.TOKEN_CLOSE_START = '{{/';
        _this.TOKEN_CLOSE_END = '}}';
        return _this;
    }

    _createClass(BlockTagCompiler, [{
        key: 'tagStart',
        value: function tagStart(context, tag) {
            context.push(this.TOKEN_OPEN_START).push(this.tagName(context, tag));
        }
    }, {
        key: 'attributes',
        value: function attributes(context, tag) {
            if (!tag.attributeGroups) return;
            tag.attributeGroups.forEach(function (group) {
                return context.push((0, _util.compileAttributes)(context, group.attributes));
            });
        }
    }, {
        key: 'openEnd',
        value: function openEnd(context) {
            context.push(this.TOKEN_OPEN_END);
        }
    }, {
        key: 'closeStart',
        value: function closeStart(context, tag) {
            context.push(this.TOKEN_CLOSE_START).push(this.tagName(context, tag));
        }
    }, {
        key: 'closeEnd',
        value: function closeEnd(context) {
            context.push(this.TOKEN_CLOSE_END);
        }
    }]);

    return BlockTagCompiler;
}(_tag.TagCompiler);