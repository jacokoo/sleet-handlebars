import { SettingCompiler } from 'sleet/lib/compiler/setting';
import { compileAttributes } from './util';

export class BlockSettingCompiler extends SettingCompiler {
    compile (context, group, tag) {
        context.push(` {{#${group.setting.name}`);
        if (group.setting.attributes) {
            const attr = compileAttributes(context, group.setting.attributes);
            context.push(`${attr}}}`);
        }
        super.compile(context, group, tag);
        context.push(`{{/${group.setting.name}}}`);
    }
}
