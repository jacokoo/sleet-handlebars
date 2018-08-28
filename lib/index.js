"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sleet_1 = require("sleet");
const sleet_html_1 = require("sleet-html");
const tag_1 = require("sleet-html/lib/compilers/tag");
const text_1 = require("sleet-html/lib/compilers/text");
const block_tag_1 = require("./compilers/block-tag");
const attributes_1 = require("./compilers/attributes");
const tag_2 = require("./compilers/tag");
const inline_tag_1 = require("./compilers/inline-tag");
const helper_1 = require("./compilers/helper");
const text_2 = require("./compilers/text");
exports.plugin = {
    prepare(context) {
        if (sleet_html_1.plugin.prepare)
            sleet_html_1.plugin.prepare(context);
        context.replace(tag_1.TagCompiler, tag_2.HandlebarsTagCompiler);
        context.replace(text_1.TextCompiler, text_2.HandlebarsTextCompiler);
        context.register(block_tag_1.BlockTagCompiler, block_tag_1.ElseCompiler, inline_tag_1.InlineTagCompiler);
        context.register(helper_1.HelperCompiler, helper_1.HelperAttributeCompiler);
        context.register(attributes_1.DynamicAttributeCompiler, attributes_1.StringValueCompiler, attributes_1.IdentifierValueCompiler);
        context.register(attributes_1.GroupSettingCompiler, attributes_1.SettingGroupCompiler);
        context.register(tag_2.AtEchoCompiler, text_2.StaticTextCompiler, text_2.DynamicTextCompiler);
        context.register(helper_1.CompareOperatorCompiler);
    },
    compile(input, options, context) {
        const { nodes, declaration } = input;
        const helpers = {};
        const blocks = ['if', 'each', 'unless', 'with'];
        const inlines = [];
        if (options.pluginOptions && options.pluginOptions.handlebars) {
            const opt = options.pluginOptions.handlebars;
            if (Array.isArray(opt.block)) {
                opt.block.forEach(it => blocks.push(it));
            }
            if (Array.isArray(opt.inline)) {
                opt.inline.forEach(it => inlines.push(it));
            }
            if (opt.helper) {
                Object.assign(helpers, opt.helper);
            }
        }
        if (declaration) {
            (declaration.option('block') || '').split(',').forEach(it => {
                if (it.trim())
                    blocks.push(it.trim());
            });
            (declaration.option('inline') || '').split(',').forEach(it => {
                if (it.trim())
                    inlines.push(it.trim());
            });
            (declaration.option('helper') || '').split(',').forEach(it => {
                const [name, count] = it.split(':');
                helpers[name.trim()] = Number(count) || 1;
            });
        }
        tag_2.compileTags(context, nodes, new sleet_1.SleetStack([], { blocks, inlines, helpers }), -1);
        return {
            code: context.getOutput(),
            extension: (declaration && declaration.extension) || 'hbs'
        };
    }
};
