import { ValueCompiler } from 'sleet/lib/compiler/value';
import { compileAttributes } from './util';

export class ValueHelperCompiler extends ValueCompiler {
    constructor (argumentCount) {
        super();
        this._arugmentCount = argumentCount;
    }

    compile (context, value, attribute, group, tag) {
        const length = value.attributes.length;
        if (length < this._arugmentCount) {
            throw new Error(`Helper: ${value.name} must have ${this._arugmentCount} arguments at least`);
        }

        if (length === this._arugmentCount) return this.inline(context, value, attribute, group, tag);
        if (length - this._arugmentCount === 1) return this.block(context, value, attribute, group, tag);
        return this.withElse(context, value, attribute, group, tag);
    }

    inline (context, value) {
        return `{{${value.name}${compileAttributes(context, value.attributes)}}}`;
    }

    sleetValue (context, v, attribute, group, tag) {
        const joiner = context.getCompiler(attribute).joiner;
        return v.map(vv => {
            const value = vv;
            const oldMajor = value.major;
            value.major = null;
            const result = context.getCompiler(value).compile(context, value, attribute, group, tag);
            value.major = oldMajor;
            return result;
        }).join(joiner);
    }

    block (context, value, attribute, group, tag) {
        const attr = compileAttributes(context, value.attributes.slice(0, -1));
        const content = this.sleetValue(context, value.attributes.slice(-1)[0].value, attribute, group, tag);

        return `{{#${value.name}${attr}}}${content}{{/${value.name}}}`;
    }

    withElse (context, value, attribute, group, tag) {
        const attr = compileAttributes(context, value.attributes.slice(0, -2));
        const e = this.sleetValue(context, value.attributes.slice(-1)[0].value, attribute, group, tag);
        const c = this.sleetValue(context, value.attributes.slice(-2, -1)[0].value, attribute, group, tag);

        return `{{#${value.name}${attr}}}${c}{{else}}${e}{{/${value.name}}}`;
    }
}
