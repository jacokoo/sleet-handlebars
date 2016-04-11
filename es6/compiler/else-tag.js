import { BlockTagCompiler } from './block-tag';

export class ElseTagCompiler extends BlockTagCompiler {
    constructor () {
        super();
        this.TOKEN_OPEN_START = '{{';
    }

    walk (context, tag) {
        if (tag.name === 'else') {
            const children = context._parent ? context._parent._children : context._children;
            const e = children.pop();
            const sibling = children.slice(-1)[0];
            e._parent = sibling;
            sibling._children.push(e);
        }
        super.walk(context, tag);
    }

    tagClose (context, tag) {
        if (context.containsIndent && tag.inlineChar) {
            const p = context._parent;
            p.containsIndent = true;
        }
    }
}
