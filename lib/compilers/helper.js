"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sleet_1 = require("sleet");
class HelperCompiler extends sleet_1.AbstractCompiler {
    constructor(node, stack, count = 1) {
        super(node, stack);
        this.count = count;
    }
    static create(node, stack) {
        return new HelperCompiler(node, stack);
    }
    compile(context) {
        if (!this.node.name) {
            const attr = this.stack.last(sleet_1.NodeType.Attribute);
            const needSpace = attr && attr.node.name === 'class';
            this.node.attributes.forEach((it, idx) => {
                const c = context.compile(it, this.stack);
                if (idx && needSpace)
                    context.push(' ');
                if (c)
                    c.mergeUp();
            });
            return;
        }
    }
}
HelperCompiler.type = sleet_1.NodeType.Helper;
exports.HelperCompiler = HelperCompiler;
class HelperAttributeCompiler extends sleet_1.AbstractCompiler {
    static create(node, stack) {
        return new HelperAttributeCompiler(node, stack);
    }
    compile(context) {
        const c = context.compile(this.node.value, this.stack);
        if (c)
            c.mergeUp();
    }
}
HelperAttributeCompiler.type = sleet_1.NodeType.HelperAttribute;
exports.HelperAttributeCompiler = HelperAttributeCompiler;
class TransformCompiler extends sleet_1.AbstractCompiler {
    static create(node, stack) {
        return new TransformCompiler(node, stack);
    }
    compile(context) {
        const ts = this.node.transformers.slice(1);
        ts.unshift(this.node.value);
        const sub = context.create(this.node.transformers[0], this.stack);
        if (!sub)
            return;
    }
}
TransformCompiler.type = sleet_1.NodeType.TransformValue;
exports.TransformCompiler = TransformCompiler;
class TransformerCompiler extends sleet_1.AbstractCompiler {
    static create(node, stack) {
        return new TransformerCompiler(node, stack);
    }
    compile(context, ...next) {
    }
}
TransformerCompiler.type = sleet_1.NodeType.Transformer;
exports.TransformerCompiler = TransformerCompiler;
