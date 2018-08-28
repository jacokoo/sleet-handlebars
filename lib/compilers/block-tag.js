"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag_1 = require("sleet-html/lib/compilers/tag");
class BlockTagCompiler extends tag_1.TagCompiler {
    static create(node, stack) {
        const tag = node;
        if (tag.name && stack.note('blocks').indexOf(tag.name) !== -1)
            return new BlockTagCompiler(node, stack);
    }
    compile(context, elseNode) {
        this.tagOpen(context);
        this.content(context);
        if (elseNode) {
            context.eol().indent().push('{{else}}');
            context.compileUp(elseNode, this.stack, -1);
        }
        this.tagClose(context);
    }
    openStart(context) {
        context.eol().indent().push('{{#').push(this.node.name);
    }
    openEnd(context) {
        context.push('}}');
    }
    tagClose(context) {
        if (this.selfClosing())
            return;
        if (context.haveIndent)
            context.eol().indent();
        context.push(`{{/${this.node.name}}}`);
    }
}
exports.BlockTagCompiler = BlockTagCompiler;
class ElseCompiler extends tag_1.TagCompiler {
    static create(node, stack) {
        if (node.name !== 'else')
            return;
        return new ElseCompiler(node, stack);
    }
    compile(context) {
        super.content(context);
    }
}
exports.ElseCompiler = ElseCompiler;
