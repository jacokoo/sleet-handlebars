'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ElseTagCompiler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _blockTag = require('./block-tag');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElseTagCompiler = exports.ElseTagCompiler = function (_BlockTagCompiler) {
    _inherits(ElseTagCompiler, _BlockTagCompiler);

    function ElseTagCompiler() {
        _classCallCheck(this, ElseTagCompiler);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ElseTagCompiler).call(this));

        _this.TOKEN_OPEN_START = '{{';
        return _this;
    }

    _createClass(ElseTagCompiler, [{
        key: 'walk',
        value: function walk(context, tag) {
            if (tag.name === 'else') {
                var children = context._parent ? context._parent._children : context._children;
                var e = children.pop();
                var sibling = children.slice(-1)[0];
                e._parent = sibling;
                sibling._children.push(e);
            }
            _get(Object.getPrototypeOf(ElseTagCompiler.prototype), 'walk', this).call(this, context, tag);
        }
    }, {
        key: 'tagClose',
        value: function tagClose(context, tag) {
            if (context.containsIndent && tag.inlineChar) {
                var p = context._parent;
                p.containsIndent = true;
            }
        }
    }]);

    return ElseTagCompiler;
}(_blockTag.BlockTagCompiler);