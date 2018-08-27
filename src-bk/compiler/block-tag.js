import { TagCompiler } from 'sleet/lib/compiler/tag';
import { compileAttributes } from './util';

export class BlockTagCompiler extends TagCompiler {
    constructor () {
        super();

        this.TOKEN_OPEN_START = '{{#';
        this.TOKEN_OPEN_END = '}}';
        this.TOKEN_CLOSE_START = '{{/';
        this.TOKEN_CLOSE_END = '}}';
    }

    tagStart (context, tag) {
        context.push(this.TOKEN_OPEN_START).push(this.tagName(context, tag));
    }

    attributes (context, tag) {
        if (!tag.attributeGroups) return;
        tag.attributeGroups.forEach(group => context.push(compileAttributes(context, group.attributes)));
    }

    openEnd (context) {
        context.push(this.TOKEN_OPEN_END);
    }

    closeStart (context, tag) {
        context.push(this.TOKEN_CLOSE_START).push(this.tagName(context, tag));
    }

    closeEnd (context) {
        context.push(this.TOKEN_CLOSE_END);
    }
}
