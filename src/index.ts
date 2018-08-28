import { SleetPlugin, Context, SleetOutput, SleetOptions, CompileResult, SleetStack } from 'sleet'
import { plugin as html } from 'sleet-html'
import { TagCompiler } from 'sleet-html/lib/compilers/tag'
import { TextCompiler } from 'sleet-html/lib/compilers/text'

import { BlockTagCompiler, ElseCompiler } from './compilers/block-tag'
import {
    DynamicAttributeCompiler, StringValueCompiler,
    IdentifierValueCompiler, GroupSettingCompiler,
    SettingGroupCompiler
} from './compilers/attributes'
import { HandlebarsTagCompiler, compileTags, AtEchoCompiler } from './compilers/tag'
import { InlineTagCompiler } from './compilers/inline-tag'
import { HelperCompiler, HelperAttributeCompiler, CompareOperatorCompiler } from './compilers/helper'
import { HandlebarsTextCompiler, StaticTextCompiler, DynamicTextCompiler } from './compilers/text'

export const plugin = {
    prepare (context: Context) {
        if (html.prepare) html.prepare(context)
        context.replace(TagCompiler, HandlebarsTagCompiler)
        context.replace(TextCompiler, HandlebarsTextCompiler)
        context.register(BlockTagCompiler, ElseCompiler, InlineTagCompiler)
        context.register(HelperCompiler, HelperAttributeCompiler)
        context.register(DynamicAttributeCompiler, StringValueCompiler, IdentifierValueCompiler)
        context.register(GroupSettingCompiler, SettingGroupCompiler)
        context.register(AtEchoCompiler, StaticTextCompiler, DynamicTextCompiler)
        context.register(CompareOperatorCompiler)
    },

    compile (input: CompileResult, options: SleetOptions, context: Context): SleetOutput {
        const {nodes, declaration} = input
        const helpers: {[name: string]: number} = {}
        const blocks = ['if', 'each', 'unless', 'with']
        const inlines: string[] = []

        if (options.pluginOptions && options.pluginOptions.handlebars) {
            const opt = options.pluginOptions.handlebars
            if (Array.isArray(opt.block)) {
                (opt.block as string[]).forEach(it => blocks.push(it))
            }
            if (Array.isArray(opt.inline)) {
                (opt.inline as string[]).forEach(it => inlines.push(it))
            }
            if (opt.helper) {
                Object.assign(helpers, opt.helper)
            }
        }

        if (declaration) {
            (declaration.option('block') || '').split(',').forEach(it => {
                if (it.trim()) blocks.push(it.trim())
            });
            (declaration.option('inline') || '').split(',').forEach(it => {
                if (it.trim()) inlines.push(it.trim())
            });
            (declaration.option('helper') || '').split(',').forEach(it => {
                const [name, count] = it.split(':')
                helpers[name.trim()] = Number(count) || 1
            })
        }

        compileTags(context, nodes, new SleetStack([], {blocks, inlines, helpers}), -1)

        return {
            code: context.getOutput(),
            extension: (declaration && declaration.extension) || 'hbs'
        }
    }
} as SleetPlugin
