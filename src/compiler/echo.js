import { InlineTagCompiler } from './inline-tag';

export class EchoCompiler extends InlineTagCompiler {
    compile (context, tag) {
        if (!tag.attributeGroups) return;
        this.startIndent(context, tag);

        const result = tag.attributeGroups.map(item => item.attributes.map(a => a.value.map(v => {
            if (v.minor === 'identifier') {
                return `${this.TOKEN_OPEN_START}${v.value}${this.TOKEN_OPEN_END}`;
            }
            return v.value;
        }).join('')).join('')).join('');
        context.push(result);
    }
}
