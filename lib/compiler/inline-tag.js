'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InlineTagCompiler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _blockTag = require('./block-tag');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InlineTagCompiler = exports.InlineTagCompiler = function (_BlockTagCompiler) {
    _inherits(InlineTagCompiler, _BlockTagCompiler);

    function InlineTagCompiler(noEscape) {
        _classCallCheck(this, InlineTagCompiler);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InlineTagCompiler).call(this));

        _this.TOKEN_OPEN_START = noEscape ? '{{{' : '{{';
        _this.TOKEN_OPEN_END = noEscape ? '}}}' : '}}';
        _this._noEscape = noEscape;
        return _this;
    }

    _createClass(InlineTagCompiler, [{
        key: 'tagName',
        value: function tagName(context, tag) {
            return this._noEscape ? tag.name.slice(1) : tag.name;
        }
    }, {
        key: 'selfClosing',
        value: function selfClosing() {
            return true;
        }
    }]);

    return InlineTagCompiler;
}(_blockTag.BlockTagCompiler);