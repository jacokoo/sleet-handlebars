import { TagCompiler } from 'sleet-html/lib/compilers/tag'
import { SleetNode, Compiler, Tag, SleetStack, Context } from 'sleet'

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

    openStart (context: Context) {
        context.eol().indent().push(this.openStartMark)
        if (this.tag.namespace) {
            context.push(this.tag.namespace).push(':')
        }
        context.push(this.tag.name || 'div')
    }

    openEnd (context: Context) {
        context.push(this.openEndMark)
    }

    tagClose (context: Context) {
        if (this.selfClosing()) return
        if (context.haveIndent) context.eol().indent()
        context.push(this.closeStartMark)
        if (this.tag.namespace) {
            context.push(this.tag.namespace).push(':')
        }
        context.push(this.tag.name || 'div').push(this.closeEndMark)
    }
}
