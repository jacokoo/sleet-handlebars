import { BlockTagCompiler } from './block-tag';

export class InlineTagCompiler extends BlockTagCompiler {
    constructor (noEscape) {
        super();
        this.TOKEN_OPEN_START = noEscape ? '{{{' : '{{';
        this.TOKEN_OPEN_END = noEscape ? '}}}' : '}}';
        this._noEscape = noEscape;
    }

    tagName (context, tag) {
        return this._noEscape ? tag.name.slice(1) : tag.name;
    }

    selfClosing () { return true; }
}
