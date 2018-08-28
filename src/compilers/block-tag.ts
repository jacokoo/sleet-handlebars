import { TagCompiler } from 'sleet-html/lib/compilers/tag'
import { SleetNode, Compiler, Tag, SleetStack, Context, compile } from 'sleet'

export class BlockTagCompiler extends TagCompiler {
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        const tag = node as Tag
        if (tag.name && stack.note('blocks').indexOf(tag.name) !== -1) return new BlockTagCompiler(node as Tag, stack)
    }

    compile (context: Context, elseNode?: SleetNode) {
        this.tagOpen(context)
        this.content(context)
        if (elseNode) {
            context.eol().indent().push('{{else}}')
            context.compileUp(elseNode, this.stack, -1)
        }
        this.tagClose(context)
    }

    openStart (context: Context) {
        context.eol().indent().push('{{#').push(this.node.name!)
    }

    openEnd (context: Context) {
        context.push('}}')
    }

    tagClose (context: Context) {
        if (this.selfClosing()) return
        if (context.haveIndent) context.eol().indent()
        context.push(`{{/${this.node.name!}}}`)
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
