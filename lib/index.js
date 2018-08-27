"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sleet_html_1 = require("sleet-html");
const block_tag_1 = require("./compilers/block-tag");
const attributes_1 = require("./compilers/attributes");
exports.plugin = {
    prepare(context) {
        if (sleet_html_1.plugin.prepare)
            sleet_html_1.plugin.prepare(context);
        context.register(block_tag_1.BlockTagCompiler);
        context.register(attributes_1.DynamicAttributeCompiler, attributes_1.StringValueCompiler, attributes_1.IdentifierValueCompiler);
    },
    compile(input, options, context) {
        return sleet_html_1.plugin.compile(input, options, context);
    }
};
