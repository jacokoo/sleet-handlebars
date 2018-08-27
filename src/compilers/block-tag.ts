import { TagCompiler } from 'sleet-html/lib/compilers/tag'
import { SleetNode, Compiler, Tag, SleetStack, Context, compile } from 'sleet'

export const blocks = ['if', 'each', 'unless', 'with']

export class BlockTagCompiler extends TagCompiler {
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        const tag = node as Tag
        if (tag.name && blocks.indexOf(tag.name) !== -1) return new BlockTagCompiler(node as Tag, stack)
    }

    openStartMark = '{{#'
    openEndMark = '}}'
    closeStartMark = '{{/'
    closeEndMark = '}}'

    compile (context: Context, elseNode?: SleetNode) {
        this.tagOpen(context)
        this.content(context)
        if (elseNode) {
            context.eol().indent().push('{{else}}')
            const c = context.compile(elseNode, this.stack, -1)
            if (c) c.mergeUp()
        }
        this.tagClose(context)
    }

    openStart (context: Context) {
        context.eol().indent().push(this.openStartMark)
        context.push(this.tag.name || 'div')
    }

    openEnd (context: Context) {
        context.push(this.openEndMark)
    }

    tagClose (context: Context) {
        if (this.selfClosing()) return
        if (context.haveIndent) context.eol().indent()
        context.push(this.closeStartMark)
        context.push(this.tag.name || 'div').push(this.closeEndMark)
    }
}

export class ElseCompiler extends TagCompiler {
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        if ((node as Tag).name !== 'else') return
        return new ElseCompiler(node as Tag, stack)
    }

    compile (context: Context) {
        super.content(context)
    }
}
