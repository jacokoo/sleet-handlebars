"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sleet_1 = require("sleet");
const sleet_html_1 = require("sleet-html");
const block_tag_1 = require("./compilers/block-tag");
const attributes_1 = require("./compilers/attributes");
const tag_1 = require("sleet-html/lib/compilers/tag");
const tag_2 = require("./compilers/tag");
const inline_tag_1 = require("./compilers/inline-tag");
const helper_1 = require("./compilers/helper");
exports.plugin = {
    prepare(context) {
        if (sleet_html_1.plugin.prepare)
            sleet_html_1.plugin.prepare(context);
        context.replace(tag_1.TagCompiler, tag_2.HandlebarsTagCompiler);
        context.register(block_tag_1.BlockTagCompiler, block_tag_1.ElseCompiler, inline_tag_1.InlineTagCompiler);
        context.register(helper_1.HelperCompiler, helper_1.HelperAttributeCompiler);
        context.register(attributes_1.DynamicAttributeCompiler, attributes_1.StringValueCompiler, attributes_1.IdentifierValueCompiler);
        context.register(attributes_1.GroupSettingCompiler, attributes_1.SettingGroupCompiler);
    },
    compile(input, options, context) {
        const { nodes, declaration } = input;
        if (declaration) {
            (declaration.option('block') || '').split(',').forEach(it => {
                block_tag_1.blocks.push(it.trim());
            });
            (declaration.option('inline') || '').split(',').forEach(it => {
                inline_tag_1.inlines.push(it.trim());
            });
        }
        tag_2.compileTags(context, nodes, new sleet_1.SleetStack(), -1);
        return {
            code: context.getOutput(),
            extension: (declaration && declaration.extension) || 'hbs'
        };
    }
};
