import { SettingCompiler } from 'sleet/lib/compiler/setting';
import { compileAttributes } from './util';

export class BlockSettingCompiler extends SettingCompiler {
    compile (context, group, tag, note) {
        const snote = context.getNote('block-setting');
        super.compile(context, group, tag, snote);

        const result = [`{{#${group.setting.name}`];
        if (group.setting.attributes) {
            const attr = compileAttributes(context, group.setting.attributes);
            result.push(`${attr}}}`);
        }

        snote.each((key, value) => result.push(value === null ? ` ${key}` : ` ${key}="${value}"`));
        result.push(`{{/${group.setting.name}}}`);
        note.set(result.join(''), null);
        snote.clear();
    }
}
