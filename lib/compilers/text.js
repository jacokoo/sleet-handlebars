"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sleet_1 = require("sleet");
class HandlebarsTextCompiler extends sleet_1.AbstractCompiler {
    static create(node, stack) {
        if (node.name === '|')
            return new HandlebarsTextCompiler(node, stack);
    }
    compile(context) {
        if (!this.node.text.length)
            return;
        const lines = this.node.text.filter(it => !!it.length);
        if (!this.inline())
            context.eol();
        lines.forEach(line => {
            if (!line.map(it => it.toHTMLString()).join('').length) {
                context.eol();
                return;
            }
            if (!this.inline())
                context.indent();
            line.forEach(it => context.compileUp(it, this.stack));
            context.eol();
        });
        context.pop();
    }
    inline() {
        return this.node.namespace === 'inline';
    }
}
HandlebarsTextCompiler.type = sleet_1.NodeType.Tag;
exports.HandlebarsTextCompiler = HandlebarsTextCompiler;
class StaticTextCompiler extends sleet_1.AbstractCompiler {
    static create(node, stack) {
        return new StaticTextCompiler(node, stack);
    }
    compile(context) {
        context.push(this.node.toHTMLString());
    }
}
StaticTextCompiler.type = sleet_1.NodeType.StaticText;
exports.StaticTextCompiler = StaticTextCompiler;
class DynamicTextCompiler extends sleet_1.AbstractCompiler {
    static create(node, stack) {
        return new DynamicTextCompiler(node, stack);
    }
    compile(context) {
        context.compileUp(this.node.value, this.stack);
    }
}
DynamicTextCompiler.type = sleet_1.NodeType.DynamicText;
exports.DynamicTextCompiler = DynamicTextCompiler;
