import { SleetPlugin, Context, SleetOutput, SleetOptions, CompileResult, SleetStack } from 'sleet'
import { plugin as html } from 'sleet-html'
import { BlockTagCompiler, ElseCompiler, blocks } from './compilers/block-tag'
import {
    DynamicAttributeCompiler, StringValueCompiler,
    IdentifierValueCompiler, GroupSettingCompiler,
    SettingGroupCompiler
} from './compilers/attributes'
import { TagCompiler } from 'sleet-html/lib/compilers/tag'
import { HandlebarsTagCompiler, compileTags } from './compilers/tag'
import { InlineTagCompiler, inlines } from './compilers/inline-tag'
import { HelperCompiler, HelperAttributeCompiler } from './compilers/helper'

export const plugin = {
    prepare (context: Context) {
        if (html.prepare) html.prepare(context)
        context.replace(TagCompiler, HandlebarsTagCompiler)
        context.register(BlockTagCompiler, ElseCompiler, InlineTagCompiler)
        context.register(HelperCompiler, HelperAttributeCompiler)
        context.register(DynamicAttributeCompiler, StringValueCompiler, IdentifierValueCompiler)
        context.register(GroupSettingCompiler, SettingGroupCompiler)
    },

    compile (input: CompileResult, options: SleetOptions, context: Context): SleetOutput {
        const {nodes, declaration} = input
        if (declaration) {
            (declaration.option('block') || '').split(',').forEach(it => {
                blocks.push(it.trim())
            });
            (declaration.option('inline') || '').split(',').forEach(it => {
                inlines.push(it.trim())
            })
        }
        compileTags(context, nodes, new SleetStack(), -1)

        return {
            code: context.getOutput(),
            extension: (declaration && declaration.extension) || 'hbs'
        }
    }
} as SleetPlugin
