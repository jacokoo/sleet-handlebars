import { ValueIdentifierCompiler } from './compiler/value-identifier';
import { BlockSettingCompiler } from './compiler/block-setting';
import { HelperValueCompiler } from './compiler/value-helper';

export function getDefaultExtension () { return 'hbs'; }

export function overrideContext (context, options, declaration) {
    context.registerCompiler('value.identifier', new ValueIdentifierCompiler());
    context.registerCompiler('setting.if', new BlockSettingCompiler());
    context.registerCompiler('value.helper', new HelperValueCompiler(1));
}
