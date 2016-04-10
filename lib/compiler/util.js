'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.compileAttributes = compileAttributes;
function compileAttributes(context, attributes) {
    var result = [];
    attributes.forEach(function (attr) {
        result.push(attr.name ? ' ' + attr.name + '=' : ' ');

        var value = attr.value[0];
        result.push(value.minor === 'quoted' ? '"' + value.value + '"' : value.value);
    });

    return result.join('');
}