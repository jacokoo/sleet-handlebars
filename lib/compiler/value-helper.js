'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ValueHelperCompiler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _value = require('sleet/lib/compiler/value');

var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ValueHelperCompiler = exports.ValueHelperCompiler = function (_ValueCompiler) {
    _inherits(ValueHelperCompiler, _ValueCompiler);

    function ValueHelperCompiler(argumentCount) {
        _classCallCheck(this, ValueHelperCompiler);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ValueHelperCompiler).call(this));

        _this._arugmentCount = argumentCount;
        return _this;
    }

    _createClass(ValueHelperCompiler, [{
        key: 'compile',
        value: function compile(context, value, attribute, group, tag) {
            var length = value.attributes.length;
            if (length < this._arugmentCount) {
                throw new Error('Helper: ' + value.name + ' must have ' + this._arugmentCount + ' arguments at least');
            }

            if (length === this._arugmentCount) return this.inline(context, value, attribute, group, tag);
            if (length - this._arugmentCount === 1) return this.block(context, value, attribute, group, tag);
            return this.withElse(context, value, attribute, group, tag);
        }
    }, {
        key: 'inline',
        value: function inline(context, value) {
            return '{{' + value.name + (0, _util.compileAttributes)(context, value.attributes) + '}}';
        }
    }, {
        key: 'sleetValue',
        value: function sleetValue(context, v, attribute, group, tag) {
            var joiner = context.getCompiler(attribute).joiner;
            return v.map(function (vv) {
                var value = vv;
                var oldMajor = value.major;
                value.major = null;
                var result = context.getCompiler(value).compile(context, value, attribute, group, tag);
                value.major = oldMajor;
                return result;
            }).join(joiner);
        }
    }, {
        key: 'block',
        value: function block(context, value, attribute, group, tag) {
            var attr = (0, _util.compileAttributes)(context, value.attributes.slice(0, -1));
            var content = this.sleetValue(context, value.attributes.slice(-1)[0].value, attribute, group, tag);

            return '{{#' + value.name + attr + '}}' + content + '{{/' + value.name + '}}';
        }
    }, {
        key: 'withElse',
        value: function withElse(context, value, attribute, group, tag) {
            var attr = (0, _util.compileAttributes)(context, value.attributes.slice(0, -2));
            var e = this.sleetValue(context, value.attributes.slice(-1)[0].value, attribute, group, tag);
            var c = this.sleetValue(context, value.attributes.slice(-2, -1)[0].value, attribute, group, tag);

            return '{{#' + value.name + attr + '}}' + c + '{{else}}' + e + '{{/' + value.name + '}}';
        }
    }]);

    return ValueHelperCompiler;
}(_value.ValueCompiler);