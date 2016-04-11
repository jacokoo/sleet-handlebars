import { ValueIdentifierCompiler } from './compiler/value-identifier';
import { BlockSettingCompiler } from './compiler/block-setting';
import { ValueHelperCompiler } from './compiler/value-helper';
import { BlockTagCompiler } from './compiler/block-tag';
import { ElseTagCompiler } from './compiler/else-tag';
import { InlineTagCompiler } from './compiler/inline-tag';
import { EchoCompiler } from './compiler/echo';

export function getDefaultExtension () { return 'hbs'; }

export function overrideContext (context, options, declaration) {
    context.registerCompiler('value.identifier', new ValueIdentifierCompiler());
    context.registerCompiler('setting.if', new BlockSettingCompiler());
    context.registerCompiler('value.helper', new ValueHelperCompiler(1));
    context.registerCompiler('tag.else', new ElseTagCompiler());
    context.registerCompiler('tag.if', new BlockTagCompiler());
    context.registerCompiler('tag.each', new BlockTagCompiler());
    context.registerCompiler('tag.unless', new BlockTagCompiler());
    context.registerCompiler('tag.with', new BlockTagCompiler());
    context.registerCompiler('tag.echo', new EchoCompiler());
    context.registerCompiler('tag.@echo', new EchoCompiler(true));

    if (options.handlebars) {
        (options.handlebars.block || []).forEach(item => {
            context.registerCompiler(`tag.${item}`, new BlockTagCompiler());
        });
        (options.handlebars.inline || []).forEach(item => {
            context.registerCompiler(`tag.${item}`, new InlineTagCompiler());
            context.registerCompiler(`tag.@${item}`, new InlineTagCompiler(true));
        });
    }

    const blocks = declaration.option('block');
    blocks && blocks.split(',').forEach(item => {
        context.registerCompiler(`tag.${item}`, new BlockTagCompiler());
    });

    const inlines = declaration.option('inline');
    inlines && inlines.split(',').forEach(item => {
        context.registerCompiler(`tag.${item}`, new InlineTagCompiler());
        context.registerCompiler(`tag.@${item}`, new InlineTagCompiler(true));
    });
}
