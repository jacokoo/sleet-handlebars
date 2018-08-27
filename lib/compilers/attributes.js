"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_1 = require("sleet-html/lib/compilers/attribute");
const block_tag_1 = require("./block-tag");
const sleet_1 = require("sleet");
const isInDynamic = (stack) => {
    const s = stack.last(sleet_1.NodeType.Tag);
    if (!s || !s.node.name)
        return false;
    const tag = s.node;
    if (tag.name && block_tag_1.blocks.indexOf(tag.name) !== -1)
        return true;
    return false;
};
class DynamicAttributeCompiler extends attribute_1.AttributeCompiler {
    static create(node, stack) {
        if (isInDynamic(stack))
            return new DynamicAttributeCompiler(node, stack);
    }
    compile(context) {
        const key = this.key(context);
        const value = this.value(context);
        if (key)
            context.push(key).push('=').push(value);
        else
            context.push(value);
    }
}
exports.DynamicAttributeCompiler = DynamicAttributeCompiler;
class StringValueCompiler {
    constructor(value) {
        this.value = value;
    }
    static create(node, stack) {
        if (isInDynamic(stack))
            return new StringValueCompiler(node);
    }
    compile(context) {
        context.push(`"${this.value.value}"`);
    }
}
StringValueCompiler.type = sleet_1.NodeType.StringValue;
exports.StringValueCompiler = StringValueCompiler;
class IdentifierValueCompiler {
    constructor(value) {
        this.value = value;
    }
    static create(node, stack) {
        if (!isInDynamic(stack))
            return new IdentifierValueCompiler(node);
    }
    compile(context) {
        context.push(`{{${this.value.value}}}`);
    }
}
IdentifierValueCompiler.type = sleet_1.NodeType.IdentifierValue;
exports.IdentifierValueCompiler = IdentifierValueCompiler;
