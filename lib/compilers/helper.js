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
            const it = this.node.attributes[0];
            const c = context.compile(it, this.stack);
            if (c)
                c.mergeUp();
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
