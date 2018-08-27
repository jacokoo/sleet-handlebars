import { TagCompiler } from 'sleet-html/lib/compilers/tag'
import { SleetNode, SleetStack, Compiler, Tag, Context } from 'sleet'

export const inlines: string[] = []

export class InlineTagCompiler extends TagCompiler {
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        const tag = node as Tag
        if (!tag.name) return

        let escape = true
        let name = tag.name

        if (name.slice(0, 1) === '@') {
            name = name.slice(1)
            escape = false
        }

        if (inlines.indexOf(name) !== -1) return new InlineTagCompiler(node as Tag, stack, !escape)
    }

    readonly noEscape: boolean

    constructor(node: Tag, stack: SleetStack, noEscape: boolean) {
        super(node, stack)
        this.noEscape = noEscape
    }

    openStart (context: Context) {
        if (!this.tag.name) return
        context.eol().indent().push(this.noEscape ? '{{{' : '{{')
        context.push(this.noEscape ? this.tag.name.slice(1) : this.tag.name)
    }

    openEnd (context: Context) {
        context.push(this.noEscape ? '}}}' : '}}')
    }

    selfClosing () {
        return true
    }
}
