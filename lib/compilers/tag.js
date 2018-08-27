"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag_1 = require("sleet-html/lib/compilers/tag");
const block_tag_1 = require("./block-tag");
function compileTags(context, tags, stack, indent = 0) {
    let i = 0;
    while (i < tags.length) {
        const item = tags[i];
        const next = tags[i + 1];
        if (!next || next.name !== 'else') {
            const co = context.compile(item, stack, indent);
            if (co)
                co.mergeUp();
            i++;
            continue;
        }
        const c = context.create(item, stack);
        if (!c || !(c instanceof block_tag_1.BlockTagCompiler)) {
            const { start } = item.location;
            throw new SyntaxError(`not paired else tag, line: ${start.line}, column: ${start.column}`);
        }
        const sub = context.sub(indent);
        c.compile(sub, next);
        sub.mergeUp();
        i += 2;
    }
}
exports.compileTags = compileTags;
class HandlebarsTagCompiler extends tag_1.TagCompiler {
    static create(node, stack) {
        return new HandlebarsTagCompiler(node, stack);
    }
    content(context) {
        if (this.selfClosing())
            return;
        compileTags(context, this.tag.children, this.stack);
    }
}
exports.HandlebarsTagCompiler = HandlebarsTagCompiler;
