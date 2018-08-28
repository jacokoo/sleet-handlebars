"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag_1 = require("sleet-html/lib/compilers/tag");
class InlineTagCompiler extends tag_1.TagCompiler {
    static create(node, stack) {
        const tag = node;
        if (!tag.name)
            return;
        let escape = true;
        let name = tag.name;
        if (name.slice(0, 1) === '@') {
            name = name.slice(1);
            escape = false;
        }
        if (stack.note('inlines').indexOf(name) !== -1)
            return new InlineTagCompiler(node, stack, !escape);
    }
    constructor(node, stack, noEscape) {
        super(node, stack);
        this.noEscape = noEscape;
    }
    openStart(context) {
        if (!this.node.name)
            return;
        context.eol().indent().push(this.noEscape ? '{{{' : '{{');
        context.push(this.noEscape ? this.node.name.slice(1) : this.node.name);
    }
    openEnd(context) {
        context.push(this.noEscape ? '}}}' : '}}');
    }
    selfClosing() {
        return true;
    }
}
exports.InlineTagCompiler = InlineTagCompiler;
