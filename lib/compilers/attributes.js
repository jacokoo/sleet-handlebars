"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_1 = require("sleet-html/lib/compilers/attribute");
const block_tag_1 = require("./block-tag");
const sleet_1 = require("sleet");
const inline_tag_1 = require("./inline-tag");
const isInDynamic = (stack) => {
    if (stack.last(sleet_1.NodeType.Setting))
        return true;
    if (stack.last(sleet_1.NodeType.TransformValue))
        return true;
    const h = stack.last(sleet_1.NodeType.Helper);
    if (h && h.node.name)
        return true;
    const s = stack.last(sleet_1.NodeType.Tag);
    if (!s || !s.node.name)
        return false;
    const tag = s.node;
    if (!tag.name)
        return false;
    if (block_tag_1.blocks.indexOf(tag.name) !== -1)
        return true;
    if (inline_tag_1.inlines.indexOf(tag.name) !== -1)
        return true;
    if (tag.name.slice(0, 1) === '@' && inline_tag_1.inlines.indexOf(tag.name.slice(1)) !== -1)
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
class StringValueCompiler extends sleet_1.AbstractCompiler {
    static create(node, stack) {
        if (isInDynamic(stack))
            return new StringValueCompiler(node, stack);
    }
    compile(context) {
        context.push(`"${this.node.value}"`);
    }
}
StringValueCompiler.type = sleet_1.NodeType.StringValue;
exports.StringValueCompiler = StringValueCompiler;
class IdentifierValueCompiler extends sleet_1.AbstractCompiler {
    static create(node, stack) {
        if (!isInDynamic(stack))
            return new IdentifierValueCompiler(node, stack);
    }
    compile(context) {
        context.push(`{{${this.node.value}}}`);
    }
}
IdentifierValueCompiler.type = sleet_1.NodeType.IdentifierValue;
exports.IdentifierValueCompiler = IdentifierValueCompiler;
class SettingGroupCompiler extends sleet_1.AbstractCompiler {
    static create(node, stack) {
        if (!node.setting)
            return;
        return new SettingGroupCompiler(node, stack);
    }
    compile(context) {
        if (!this.node.setting)
            return;
        const compiler = context.create(this.node.setting, this.stack);
        if (!compiler)
            return;
        const sub = context.sub();
        compiler.compile(sub, this.node);
        sub.mergeUp();
    }
}
SettingGroupCompiler.type = sleet_1.NodeType.AttributeGroup;
exports.SettingGroupCompiler = SettingGroupCompiler;
class GroupSettingCompiler {
    constructor(node, stack) {
        this.node = node;
        this.stack = stack;
    }
    static create(node, stack) {
        return new GroupSettingCompiler(node, stack);
    }
    compile(context, group) {
        context.push('{{#').push(this.node.name);
        const stack = this.stack.concat(this.node);
        if (this.node.attributes.length)
            context.push(' ');
        this.node.attributes.forEach((it, idx) => {
            const sub = context.compile(it, stack);
            if (idx)
                context.push(' ');
            if (sub)
                sub.mergeUp();
        });
        context.push('}}');
        group.attributes.forEach((it, idx) => {
            const sub = context.compile(it, this.stack);
            if (idx)
                context.push(' ');
            if (sub)
                sub.mergeUp();
        });
        context.push(`{{/${this.node.name}}}`);
    }
}
GroupSettingCompiler.type = sleet_1.NodeType.Setting;
exports.GroupSettingCompiler = GroupSettingCompiler;
