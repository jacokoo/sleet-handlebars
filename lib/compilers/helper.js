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
            this.noName(context);
            return;
        }
        const helpers = this.stack.note('helpers');
        const count = helpers[this.node.name] || 1;
        const cs = this.node.attributes.slice(0, count);
        const remain = this.node.attributes.slice(count);
        const ctx = context.sub();
        cs.map((it, idx) => {
            if (idx)
                ctx.push(' ');
            ctx.compileUp(it, this.stack);
        });
        if (!remain.length) {
            context.push(`{{${this.node.name} ${ctx.getOutput()}}}`);
            return;
        }
        const o = this.stack.last();
        o.note.content = true;
        context.push(`{{#${this.node.name} ${ctx.getOutput()}}}`);
        const c = ctx.compile(remain[0], this.stack);
        const cc = c ? c.getOutput() : '';
        context.push(cc);
        if (remain.length > 1) {
            const ctx2 = context.sub();
            remain.slice(1).map(it => ctx2.compileUp(it, this.stack));
            const ccc = ctx2.getOutput();
            context.push(`{{else}}${ccc}`);
        }
        context.push(`{{/${this.node.name}}`);
    }
    noName(context) {
        const attr = this.stack.last(sleet_1.NodeType.Attribute);
        const needSpace = attr && attr.node.name === 'class';
        this.node.attributes.forEach((it, idx) => {
            const c = context.compile(it, this.stack);
            if (c) {
                if (idx && needSpace)
                    context.push(' ');
                c.mergeUp();
            }
        });
    }
}
HelperCompiler.type = sleet_1.NodeType.Helper;
exports.HelperCompiler = HelperCompiler;
class HelperAttributeCompiler extends sleet_1.AbstractCompiler {
    static create(node, stack) {
        return new HelperAttributeCompiler(node, stack);
    }
    compile(context) {
        context.compileUp(this.node.value, this.stack);
    }
}
HelperAttributeCompiler.type = sleet_1.NodeType.HelperAttribute;
exports.HelperAttributeCompiler = HelperAttributeCompiler;
class CompareOperatorCompiler extends sleet_1.AbstractCompiler {
    static create(node, stack) {
        return new CompareOperatorCompiler(node, stack);
    }
    compile(context) {
        context.push(`"${this.node.value}"`);
    }
}
CompareOperatorCompiler.type = sleet_1.NodeType.CompareOperator;
exports.CompareOperatorCompiler = CompareOperatorCompiler;
