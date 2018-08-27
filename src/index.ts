import { SleetPlugin, Context, SleetOutput, SleetOptions, CompileResult } from 'sleet'
import { plugin as html } from 'sleet-html'
import { BlockTagCompiler } from './compilers/block-tag'
import { DynamicAttributeCompiler, StringValueCompiler, IdentifierValueCompiler } from './compilers/attributes'

export const plugin = {
    prepare (context: Context) {
        if (html.prepare) html.prepare(context)
        context.register(BlockTagCompiler)
        context.register(DynamicAttributeCompiler, StringValueCompiler, IdentifierValueCompiler)
    },

    compile (input: CompileResult, options: SleetOptions, context: Context): SleetOutput {
        return html.compile(input, options, context)
    }
} as SleetPlugin
