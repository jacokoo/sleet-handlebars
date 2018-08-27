"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag_1 = require("sleet-html/lib/compilers/tag");
exports.blocks = ['if', 'each', 'unless', 'with'];
class BlockTagCompiler extends tag_1.TagCompiler {
    constructor() {
        super(...arguments);
        this.openStartMark = '{{#';
        this.openEndMark = '}}';
        this.closeStartMark = '{{/';
        this.closeEndMark = '}}';
    }
    static create(node, stack) {
        const tag = node;
        if (tag.name && exports.blocks.indexOf(tag.name) !== -1)
            return new BlockTagCompiler(node, stack);
    }
    openStart(context) {
        context.eol().indent().push(this.openStartMark);
        if (this.tag.namespace) {
            context.push(this.tag.namespace).push(':');
        }
        context.push(this.tag.name || 'div');
    }
    openEnd(context) {
        context.push(this.openEndMark);
    }
    tagClose(context) {
        if (this.selfClosing())
            return;
        if (context.haveIndent)
            context.eol().indent();
        context.push(this.closeStartMark);
        if (this.tag.namespace) {
            context.push(this.tag.namespace).push(':');
        }
        context.push(this.tag.name || 'div').push(this.closeEndMark);
    }
}
exports.BlockTagCompiler = BlockTagCompiler;
